/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch').default;
const SdkProperties = require('./SdkProperties');

const { FOLDERS } = require('../../ApplicationConstants');

const NodeConsoleLogger = require('../../loggers/NodeConsoleLogger');
const unwrapExceptionMessage = require('../../utils/ExceptionUtils').unwrapExceptionMessage;

const NodeTranslationService = require('../../services/NodeTranslationService');
const FileSystemService = require('../../services/FileSystemService');
const { executeWithSpinner } = require('../../ui/CliSpinner');

const {
	DOWNLOADING_SUITECLOUD_SDK,
	DOWNLOADING_SUITECLOUD_SDK_SUCCESS,
	DOWNLOADING_SUITECLOUD_SDK_ERROR,
	DOWNLOADING_SUITECLOUD_SDK_ERROR_FILE_NOT_AVAILABLE,
} = require('../../services/TranslationKeys');

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

			const sdkDestinationFile = path.join(sdkDirectory, SdkProperties.getSdkFileName());
			if (this._fileSystemService.fileExists(sdkDestinationFile)) {
				return successDownloadResponse;
			}
			await executeWithSpinner({
				action: this._downloadFile(fullURL, sdkDestinationFile),
				message: NodeTranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK, fullURL),
				verbose: true,
			});
			NodeConsoleLogger.info(NodeTranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK_SUCCESS));
			return successDownloadResponse
		}
		catch (error) {
			const errMsg = unwrapExceptionMessage(error);
			NodeConsoleLogger.error(NodeTranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK_ERROR, fullURL, errMsg));
			return {success: false, errors: [errMsg]};
		}
	}

	_downloadFile(url, sdkDestinationFile) {
		// const proxy = process.env.npm_config_https_proxy || process.env.npm_config_proxy;
		// const isProxyRequired = proxy && !SdkProperties.configFileExists();
		// const removeJarFilesFrom = this._removeJarFilesFrom;

		return fetch(url).then(response => new Promise((resolve, reject) => {
			if (!VALID_JAR_CONTENT_TYPES.includes(response.headers.get('content-type'))) {
				throw NodeTranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK_ERROR_FILE_NOT_AVAILABLE);
			}

			// // remove all jar files before writing response to file
			// removeJarFilesFrom(sdkDirectory)

			const file = fs.createWriteStream(sdkDestinationFile);
			response.body.pipe(file);
			file.on('close', () => resolve());
			file.on('error', reject);
		}));
	}

	_removeJarFilesFrom(folder) {
		// remove all JAR files before writing response to file
		fs.readdirSync(folder)
			.filter(file => /[.]jar$/.test(file))
			.map(file => fs.unlinkSync(path.join(folder, file)));
	}
}

module.exports = new SdkDownloadService();
