/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');
const SDKProperties = require('./SDKProperties');

const BASE_PATH = process.env.NETSUITE_SDF_PATH !== undefined
	? process.env.NETSUITE_SDF_PATH
	: require('os').homedir();

const { FOLDERS } = require('../../ApplicationConstants');

const NodeUtils = require('../../utils/NodeUtils');
const unwrapExceptionMessage = require('../../utils/ExceptionUtils').unwrapExceptionMessage;

const TranslationService = require('../../services/TranslationService');
const FileSystemService = require('../../services/FileSystemService');
const { executeWithSpinner } = require('../../ui/CliSpinner');

const {
	DOWNLOADING_SUITECLOUD_SDK,
	DOWNLOADING_SUITECLOUD_SDK_SUCCESS,
	DOWNLOADING_SUITECLOUD_SDK_ERROR,
	DOWNLOADING_SUITECLOUD_SDK_ERROR_FILE_NOT_AVAILABLE,
} = require('../../services/TranslationKeys');

const VALID_JAR_CONTENT_TYPES = [
	'application/java-archive',
	'application/x-java-archive',
	'application/x-jar',
];

const successDownloadResponse = { success: true, installedVersion: SDKProperties.getSDKVersion() };

class SDKDownloadService {
	constructor() {
		this._fileSystemService = new FileSystemService();
	}

	download() {
		const sdkDirectory = this._fileSystemService.createFolder(
			BASE_PATH,
			FOLDERS.SUITECLOUD_SDK
		);
		const sdkDestinationFile = path.join(sdkDirectory, SDKProperties.getSDKFileName());
		const fullURL = `${SDKProperties.getDownloadURL()}/${SDKProperties.getSDKFileName()}`;
		if (this._fileSystemService.fileExists(sdkDestinationFile)) {
			return successDownloadResponse;
		}

		return executeWithSpinner({
			action: this._downloadFile(fullURL, sdkDestinationFile),
			message: TranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK, fullURL),
			verbose: true
		})
			.then(() => {
				NodeUtils.println(
					TranslationService.getMessage(DOWNLOADING_SUITECLOUD_SDK_SUCCESS),
					NodeUtils.COLORS.INFO
				);
				return successDownloadResponse;
			})
			.catch(error => {
				const errMsg = unwrapExceptionMessage(error);
				NodeUtils.println(
					TranslationService.getMessage(
						DOWNLOADING_SUITECLOUD_SDK_ERROR,
						fullURL,
						errMsg
					),
					NodeUtils.COLORS.ERROR
				);
				return {success: false, errors: [errMsg]};
			});
	}

	_downloadFile(url, sdkDestinationFile) {
		const proxy = process.env.npm_config_https_proxy || process.env.npm_config_proxy;

		const isProxyRequired = proxy && !SDKProperties.configFileExists();

		const options = {
			method: 'GET',
			uri: url,
			encoding: 'binary',
			resolveWithFullResponse: true,
			...(isProxyRequired && { proxy: proxy }),
		};
		return request(options).then(function(response) {
			if (!VALID_JAR_CONTENT_TYPES.includes(response.headers['content-type'])) {
				throw TranslationService.getMessage(
					DOWNLOADING_SUITECLOUD_SDK_ERROR_FILE_NOT_AVAILABLE
				);
			}

			const file = fs.createWriteStream(sdkDestinationFile);
			file.write(response.body, 'binary');
			file.end();
		});
	}
}

module.exports = new SDKDownloadService();