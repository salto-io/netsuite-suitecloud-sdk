/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const SdkProperties = require('./SdkProperties');

const https = require('https');
const http = require('http');
const { URL } = require('url');
const { ENCODING, EVENT, HEADER, PROTOCOL } = require('../../utils/http/HttpConstants');

const { FOLDERS } = require('../../ApplicationConstants');

const NodeConsoleLogger = require('../../loggers/NodeConsoleLogger');
const unwrapExceptionMessage = require('../../utils/ExceptionUtils').unwrapExceptionMessage;

const NodeTranslationService = require('../../services/NodeTranslationService');
const FileSystemService = require('../../services/FileSystemService');
const { executeWithSpinner } = require('../../ui/CliSpinner');

const { SDK_DOWNLOAD_SERVICE } = require('../../services/TranslationKeys');

const VALID_JAR_CONTENT_TYPES = ['application/java-archive', 'application/x-java-archive', 'application/x-jar'];

const successDownloadResponse = { success: true, installedVersion: SdkProperties.getSdkVersion() };

class SdkDownloadService {
	constructor() {
		this._fileSystemService = new FileSystemService();
	}

	async download() {
		const fullURL = `${SdkProperties.getDownloadURL()}/${SdkProperties.getSdkFileName()}`;
		try {
			const sdkParentDirectory = this._fileSystemService.createFolder(SdkProperties.getSdkBasePath(), FOLDERS.SUITECLOUD_SDK);
			// // remove OLD jar files
			// this._removeJarFilesFrom(sdkParentDirectory);
			const sdkDirectory = this._fileSystemService.createFolder(sdkParentDirectory, FOLDERS.NODE_CLI);

			const destinationFilePath = path.join(sdkDirectory, SdkProperties.getSdkFileName());
			if (this._fileSystemService.fileExists(destinationFilePath)) {
				return successDownloadResponse;
			}
			await executeWithSpinner({
				action: this._downloadJarFilePromise(fullURL, destinationFilePath),
				message: NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.DOWNLOADING, fullURL),
				verbose: true,
			});
			NodeConsoleLogger.info(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.SUCCESS));
			return successDownloadResponse;
		}
		catch (error) {
			const errMsg = unwrapExceptionMessage(error);
			NodeConsoleLogger.error(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.ERROR, fullURL, errMsg));
			return {success: false, errors: [errMsg]};
		}
	}

	_downloadJarFilePromise(downloadUrl, destinationFilePath) {
		const downloadUrlObject = new URL(downloadUrl);
		const downloadUrlProtocol = downloadUrlObject.protocol;

		const requestOptions = {
			encoding: ENCODING.BINARY,
		};

		if (!/^http:$|^https:$/.test(downloadUrlProtocol)) {
			throw new Error(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.WRONG_DOWNLOAD_URL_PROTOCOL));
		}

		const httpxModule = PROTOCOL.HTTP.match(downloadUrlObject.protocol) ? http : https;

		return new Promise((resolve, reject) => {
			const clientReq = httpxModule.get(downloadUrlObject, requestOptions, (response) => {
				const chunks = [];
				response.on(EVENT.DATA, (chunk) => chunks.push(Buffer.from(chunk, ENCODING.BINARY)));

				response.on(EVENT.END, () => {
					if (!VALID_JAR_CONTENT_TYPES.includes(response.headers[HEADER.CONTENT_TYPE])) {
						reject(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.FILE_NOT_AVAILABLE_ERROR));
					}

			const jarFile = fs.createWriteStream(destinationFilePath);
				jarFile.write(Buffer.concat(chunks), ENCODING.BINARY);
				jarFile.end();
				resolve();
			});

			response.on(EVENT.ERROR, (error) => {
				reject(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.FILE_NOT_AVAILABLE_ERROR));
			});
		});

			clientReq
				.once(EVENT.TIMEOUT, () => {
					clientReq.destroy();
					reject(new Error(NodeTranslationService.getMessage(SDK_DOWNLOAD_SERVICE.GET_TIMEOUT)));
				})
				.once(EVENT.ERROR, (err) => reject(err))
				.end();
		});
	}

	_removeJarFilesFrom(folder) {
		// remove all JAR files before writing response to file
		fs.readdirSync(folder)
			.filter((file) => /[.]jar$/.test(file))
			.map((file) => fs.unlinkSync(path.join(folder, file)));
	}
}

module.exports = new SdkDownloadService();
