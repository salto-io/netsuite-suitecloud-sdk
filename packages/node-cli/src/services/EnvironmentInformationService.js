/*
 ** Copyright (c) 2024 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';
const spawn = require('child_process').spawnSync;
const { SDK_REQUIRED_JAVA_VERSION } = require('../ApplicationConstants');

module.exports = class EnvironmentInformationService {
	isInstalledJavaVersionValid() {
		const installedJavaVersion = this.getInstalledJavaVersionString();
		if (installedJavaVersion) {
			return installedJavaVersion.startsWith(SDK_REQUIRED_JAVA_VERSION);
		}
		// in case there is no java installed or not available from path
		return false;
	}

	getInstalledJavaVersionString() {
		const childProcess = spawn('java', ['-version'], { shell: true });
		// The output should be similar to: java version "17.0.4" 2022-07-19 LTS
		// It's expected to have the version surrounded by double quotes and only contain numbers and dots
		const javaVersionOutput = childProcess.stderr.toString();
		const match = javaVersionOutput.match(/version "(\d+)\.*/);
		return match ? match[1] : undefined;
	}
};
