/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const {
	SDK_INTEGRATION_MODE_JVM_OPTION,
	SDK_CLIENT_PLATFORM_JVM_OPTION,
	SDK_CLIENT_PLATFORM_VERSION_JVM_OPTION,
	SDK_REQUIRED_JAVA_VERSION,
} = require('./ApplicationConstants');
const path = require('path');
const FileUtils = require('./utils/FileUtils');
const spawn = require('child_process').spawn;
const CLISettingsService = require('./services/settings/CLISettingsService');
const EnvironmentInformationService = require('./services/EnvironmentInformationService');
const NodeTranslationService = require('./services/NodeTranslationService');
const { ERRORS } = require('./services/TranslationKeys');
const SdkErrorCodes = require('./SdkErrorCodes');
const ExecutionEnvironmentContext = require('./ExecutionEnvironmentContext');
const SdkProperties = require('./core/sdksetup/SdkProperties');
const os = require('os');
const { unlinkSync, writeFileSync } = require('fs');

const DATA_EVENT = 'data';
const CLOSE_EVENT = 'close';
const UTF8 = 'utf8';

const isWin = process.platform === 'win32'; // taken from https://stackoverflow.com/questions/8683895/how-do-i-determine-the-current-operating-system-with-node-js
const echoOffCommand = '@echo off'; // to avoid echoing the commands in the .bat file

module.exports = class SdkExecutor {
	constructor(executionEnvironmentContext) {
		this._sdkPath = SdkProperties.getSdkPath();
		this._CLISettingsService = new CLISettingsService();
		this._environmentInformationService = new EnvironmentInformationService();
		this.childProcess = null;

		if (!executionEnvironmentContext) {
			this._executionEnvironmentContext = new ExecutionEnvironmentContext();
		} else {
			this._executionEnvironmentContext = executionEnvironmentContext;
		}
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
				this._addChildProcessListeners(executionContext.isIntegrationMode(), commandFile, resolve, reject);
			} catch (e) {
				reject(e);
			}
		});
	}

	_addChildProcessListeners(isIntegrationMode, commandFile, resolve, reject) {
		let lastSdkOutput = '';
		let lastSdkError = '';

		this.childProcess.stderr.on(DATA_EVENT, (data) => {
			lastSdkError += data.toString(UTF8);
		});
		this.childProcess.stdout.on(DATA_EVENT, (data) => {
			lastSdkOutput += data.toString(UTF8);
		});

		this.childProcess.on(CLOSE_EVENT, (code) => {
			if (commandFile) {
				unlinkSync(commandFile)
			}
			if (code === 0) {
				try {
					const output = isIntegrationMode ? JSON.parse(lastSdkOutput) : lastSdkOutput;
					if (isIntegrationMode && output.errorCode && output.errorCode === SdkErrorCodes.NO_TBA_SET_FOR_ACCOUNT) {
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
				}
				reject(NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.SDK_ERROR, code, lastSdkError));
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

		const cliParams = this._convertParamsObjToString(executionContext.getParams(), executionContext.getFlags());

		const integrationModeOption = executionContext.isIntegrationMode() ? SDK_INTEGRATION_MODE_JVM_OPTION : '';

		const clientPlatform = `${SDK_CLIENT_PLATFORM_JVM_OPTION}=${this._executionEnvironmentContext.getPlatform()}`;
		const clientPlatformVersionOption = `${SDK_CLIENT_PLATFORM_VERSION_JVM_OPTION}=${this._executionEnvironmentContext.getPlatformVersion()}`;
		const customVmOptions = this._getCustomVmOptionsString();

		if (!FileUtils.exists(this._sdkPath)) {
			throw NodeTranslationService.getMessage(ERRORS.SDKEXECUTOR.NO_JAR_FILE_FOUND, path.join(__dirname, '..'));
		}
		const quotedSdkJarPath = `"${this._sdkPath}"`;

		const vmOptions = `${integrationModeOption} ${clientPlatform} ${clientPlatformVersionOption} ${customVmOptions}`;
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

	_getCustomVmOptionsString() {
		const customVmOptions = this._CLISettingsService.getCustomVmOptions();
		if (!customVmOptions) {
			return '';
		}

		const addVmOptionToString = (prevString, vmOptionKey) =>
			(prevString += customVmOptions[vmOptionKey] === '' ? ` ${vmOptionKey}` : ` ${vmOptionKey}="${customVmOptions[vmOptionKey].trim()}"`);
		// customVmOptions are already validated at CLISettingsService, it will be an object at this point
		return Object.keys(customVmOptions).reduce(addVmOptionToString, '').trim();
	}

	_checkIfJavaVersionIssue() {
		const javaVersionInstalled = this._environmentInformationService.getInstalledJavaVersionString();
		if (javaVersionInstalled.startsWith(SDK_REQUIRED_JAVA_VERSION)) {
			this._CLISettingsService.setJavaVersionValid(true);
			return;
		}

		this._CLISettingsService.setJavaVersionValid(false);
		if (javaVersionInstalled === '') {
			return NodeTranslationService.getMessage(ERRORS.CLI_SDK_JAVA_VERSION_NOT_INSTALLED, SDK_REQUIRED_JAVA_VERSION);
		}
		return NodeTranslationService.getMessage(ERRORS.CLI_SDK_JAVA_VERSION_NOT_COMPATIBLE, javaVersionInstalled, SDK_REQUIRED_JAVA_VERSION);
	}
};
