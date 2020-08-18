/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
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
		this._loadCache();
	}

	getDownloadURL() {
		// read config.js file if exists or use package.json
		const configFile = this.configFileExists() ? CONFIG_FILE_CACHE : pkgConfig;
		return configFile.sdkDownloadUrl;
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
		const BASE_PATH = process.env.NETSUITE_SDF_PATH !== undefined
			? process.env.NETSUITE_SDF_PATH
			: require('os').homedir();
		return path.join(BASE_PATH, `${FOLDERS.SUITECLOUD_SDK}/${FOLDERS.NODE_CLI}/${this.getSdkFileName()}`);
	}
}

module.exports = new SdkProperties();
