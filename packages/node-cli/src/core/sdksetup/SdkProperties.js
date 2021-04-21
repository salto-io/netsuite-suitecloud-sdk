/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const path = require('path');
const fs = require('fs');
const { SDK_FILENAME, FOLDERS, SDK_VERSION } = require('../../ApplicationConstants');

const pkgConfig = require('../../../package.json');
const CONFIG_FILE = './config.json';


let CONFIG_FILE_CACHE = null;

class SdkProperties {
	constructor() {
		this._commandTimeout = undefined;
		this._loadCache();
	}

	getDownloadURL() {
		// read config.js file if exists or use package.json
		const configFile = this.configFileExists() ? CONFIG_FILE_CACHE : pkgConfig;
		return configFile.sdkDownloadUrl;
	}

	getSdkBasePath() {
		return process.env.NETSUITE_SDF_PATH !== undefined
			? process.env.NETSUITE_SDF_PATH
			: require('os').homedir();
	}

	getSdkVersion() {
		return SDK_VERSION;
	}

	getSdkFileName() {
		return this.configFileExists() ? CONFIG_FILE_CACHE.sdkFilename : SDK_FILENAME;
	}

	configFileExists() {
		return CONFIG_FILE_CACHE !== null;
	}

	_loadCache() {
		if (fs.existsSync(path.resolve(__dirname, CONFIG_FILE))) {
			CONFIG_FILE_CACHE = JSON.parse(fs.readFileSync(CONFIG_FILE,'utf8'));
		}
	}

	getSdkPath() {
		return path.join(this.getSdkBasePath(), `${FOLDERS.SUITECLOUD_SDK}/${FOLDERS.NODE_CLI}/${this.getSdkFileName()}`);
	}

	getCommandTimeout() {
		return this._commandTimeout;
	}

	setCommandTimeout(commandTimeout) {
		this._commandTimeout = commandTimeout
	}
}

module.exports = new SdkProperties();
