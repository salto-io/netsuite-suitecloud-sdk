/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const {
	SDK_INTEGRATION_MODE_JVM_OPTION,
	SDK_CLIENT_PLATFORM_VERSION_JVM_OPTION,
	SDK_PROXY_JVM_OPTIONS,
	SDK_REQUIRED_JAVA_VERSION,
	SDK_VERSION,
} = require('./ApplicationConstants');
const path = require('path');
const FileUtils = require('./utils/FileUtils');
const spawn = require('child_process').spawn;
const CLISettingsService = require('./services/settings/CLISettingsService');
const EnvironmentInformationService = require('./services/EnvironmentInformationService');
const url = require('url');
const NodeTranslationService = require('./services/NodeTranslationService');
const { ERRORS } = require('./services/TranslationKeys');
const SdkErrorCodes = require('./SdkErrorCodes');
const SdkProperties = require('./core/sdksetup/SdkProperties');
const NodeConsoleLogger = require('./loggers/NodeConsoleLogger');
const os = require('os');
const { unlinkSync, writeFileSync } = require('fs');

const DATA_EVENT = 'data';
const CLOSE_EVENT = 'close';
const UTF8 = 'utf8';

const isWin = process.platform === 'win32'; // taken from https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
const echoOffCommand = '@echo off'; // to avoid echoing the commands in the .bat file

module.exports = class SdkExecutor {
	constructor() {
		this._sdkPath = SdkProperties.getSdkPath();
		this._commandTimeout = SdkProperties.getCommandTimeout();
		this._CLISettingsService = new CLISettingsService();
		this._environmentInformationService = new EnvironmentInformationService();
		this.childProcess = null;
	}

	execute(executionContext, token) {
		return new Promise((resolve, reject) => {
			if (token !== undefined && token !== null) {
				token.cancel = (reason) => {
					this.childProcess.kill('SIGKILL');
					reject(reason);
				};
			}
			try {
				const { childProcess, commandFile } = this._launchJvmCommand(executionContext);
				this.childProcess = childProcess;
				this._addChildProcessListeners(executionContext, commandFile, resolve, reject);
			} catch (e) {
				reject(e);
			}
		});
	}

	_addChildProcessListeners(executionContext, commandFile, resolve, reject) {
		let lastSdkOutput = '';
		let lastSdkError = '';
		let isTimeout = false;
		let timerId;

		if (this._commandTimeout) {
			timerId = setTimeout(() => {
				isTimeout = true;
				this.childProcess.kill();
			}, this._commandTimeout);
		}

		this.childProcess.stderr.on(DATA_EVENT, (data) => {
			lastSdkError += data.toString(UTF8);
		});
		this.childProcess.stdout.on(DATA_EVENT, (data) => {
			lastSdkOutput += data.toString(UTF8);
		});

		this.childProcess.on(CLOSE_EVENT, (code) => {
			if (!isTimeout && timerId) {
				clearTimeout(timerId)
			}
			if (commandFile) {
				unlinkSync(commandFile)
			}
			if (code === 0) {
				try {
					const output = executionContext.isIntegrationMode() ? JSON.parse(lastSdkOutput) : lastSdkOutput;
					if (executionContext.isIntegrationMode() && output.errorCode && output.errorCode === SdkErrorCodes.NO_TBA_SET_FOR_ACCOUNT) {
						reject(NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.NO_TBA_FOR_ACCOUNT_AND_ROLE));
					}
					resolve(output);
				} catch (error) {
					reject(NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.RUNNING_COMMAND, error));
				}
			} else {
				const javaVersionError = this._checkIfJavaVersionIssue();
				if (javaVersionError) {
					reject(javaVersionError);
				} else if (isTimeout) {
					reject(`${executionContext.getCommand()} command timed out after ${this._commandTimeout} ms`);
				} else {
					reject(NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.SDK_ERROR, code, lastSdkError));
				}
			}
		});
	}

	_launchJvmCommand(executionContext) {
		if (!this._CLISettingsService.isJavaVersionValid()) {
			const javaVersionError = this._checkIfJavaVersionIssue();
			if (javaVersionError) {
				throw javaVersionError;
			}
		}

		const proxyOptions = this._getProxyOptions();
		const cliParams = this._convertParamsObjToString(executionContext.getParams(), executionContext.getFlags());

		const integrationModeOption = executionContext.isIntegrationMode() ? SDK_INTEGRATION_MODE_JVM_OPTION : '';

		const clientPlatformVersionOption = `${SDK_CLIENT_PLATFORM_VERSION_JVM_OPTION}=${process.versions.node}`;

		if (!FileUtils.exists(this._sdkPath)) {
			NodeConsoleLogger.error(`file ${this._sdkPath} is missing`);
			throw NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.NO_JAR_FILE_FOUND, SDK_VERSION);
		}
		const quotedSdkJarPath = `"${this._sdkPath}"`;

		const vmOptions = `${proxyOptions} ${integrationModeOption} ${clientPlatformVersionOption}`;
		const jvmCommand = `java -jar ${vmOptions} ${quotedSdkJarPath} ${executionContext.getCommand()} ${cliParams}`;

		const useScriptCommand = isWin && jvmCommand.length > 2000; //https://support.microsoft.com/en-us/help/830473/command-prompt-cmd-exe-command-line-string-limitation
		const command = useScriptCommand
			? `${os.tmpdir()}${path.sep}sdf_command_${String(Date.now())}.bat`
			: jvmCommand;
		if (useScriptCommand) {
			writeFileSync(command, `${echoOffCommand}\n${jvmCommand}`);
		}
		return {
			childProcess: spawn(command, [], { shell: true }),
			commandFile: useScriptCommand ? command : undefined,
		};
	}

	_getProxyOptions() {
		if (!this._CLISettingsService.useProxy()) {
			return '';
		}
		const proxyUrl = url.parse(this._CLISettingsService.getProxyUrl());
		if (!proxyUrl.protocol || !proxyUrl.port || !proxyUrl.hostname) {
			throw NodeTranslationService.getMessage(ERRORS.WRONG_PROXY_SETTING, proxyUrl);
		}
		const protocolWithoutColon = proxyUrl.protocol.slice(0, -1);
		const hostName = proxyUrl.hostname;
		const port = proxyUrl.port;
		const { PROTOCOL, HOST, PORT } = SDK_PROXY_JVM_OPTIONS;

		return `${PROTOCOL}=${protocolWithoutColon} ${HOST}=${hostName} ${PORT}=${port}`;
	}

	_convertParamsObjToString(cliParams, flags) {
		let cliParamsAsString = '';
		for (const param in cliParams) {
			if (cliParams.hasOwnProperty(param)) {
				const value = cliParams[param] ? ` ${cliParams[param]} ` : ' ';
				cliParamsAsString += param + value;
			}
		}

		if (flags && Array.isArray(flags)) {
			flags.forEach((flag) => {
				cliParamsAsString += ` ${flag} `;
			});
		}

		return cliParamsAsString;
	}

	_checkIfJavaVersionIssue() {
		const javaVersionInstalled = this._environmentInformationService.getInstalledJavaVersionString();
		if (!javaVersionInstalled) {
			return NodeTranslationService.getMessage(ERRORS.CLI_SDK_JAVA_VERSION_NOT_INSTALLED, SDK_REQUIRED_JAVA_VERSION);
		}
		if (javaVersionInstalled.startsWith(SDK_REQUIRED_JAVA_VERSION)) {
			this._CLISettingsService.setJavaVersionValid(true);
			return;
		}
		this._CLISettingsService.setJavaVersionValid(false);
		return NodeTranslationService.getMessage(ERRORS.CLI_SDK_JAVA_VERSION_NOT_COMPATIBLE, javaVersionInstalled, SDK_REQUIRED_JAVA_VERSION);
	}
};
