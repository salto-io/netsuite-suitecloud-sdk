/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
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
		// The output can be:
		// 1. java full version "11.1.0_201-b09"
		// 2. openjdk version "11.0.8" 2020-07-14
		// 3. NOTE: Picked up JDK_JAVA_OPTIONS: -Xmx1024m
		// 	  openjdk version "11.0.8" 2020-07-14
		const javaVersionOutput = childProcess.stderr.toString();
		const match = javaVersionOutput.match(/version "(\d+)\.*/);
		return match ? match[1] : undefined
	}
};
