/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const path = require('path');
const SetupCommandGenerator = require('./SetupCommandGenerator');
const SDKExecutionContext = require('../SDKExecutionContext');
const { executeWithSpinner } = require('../ui/CliSpinner');
const SDKOperationResultUtils = require('../utils/SDKOperationResultUtils');
const FileUtils = require('../utils/FileUtils');
const TranslationService = require('../services/TranslationService');
const OperationResultStatus = require('./OperationResultStatus');

const {
	FILES: { MANIFEST_XML },
} = require('../ApplicationConstants');

const {
	COMMAND_SETUPACCOUNT: { ERRORS, MESSAGES },
} = require('../services/TranslationKeys');

const NON_INTERACTIVE_ANSWERS = {
	AUTH_ID: 'authid',
	SAVE_TOKEN_ACCOUNT_ID: 'accountid',
	SAVE_TOKEN_ID: 'tokenid',
	SAVE_TOKEN_SECRET: 'tokensecret',
};

const AUTH_MODE = {
	OAUTH: 'OAUTH',
	SAVE_TOKEN: 'SAVE_TOKEN',
	REUSE: 'REUSE',
};

const COMMANDS = {
	AUTHENTICATE: 'authenticate',
	MANAGEAUTH: 'manageauth',
};

const FLAGS = {
	LIST: 'list',
	SAVETOKEN: 'savetoken',
	DEVELOPMENTMODE: 'developmentmode'
};

module.exports = class SetupNonInteractiveCommandGenerator extends SetupCommandGenerator {
	constructor(options) {
		super(options);
	}

	async _getCommandQuestions() {
		this._checkWorkingDirectoryContainsValidProject();
	}

	_checkWorkingDirectoryContainsValidProject() {
		if (!FileUtils.exists(path.join(this._projectFolder, MANIFEST_XML))) {
			throw TranslationService.getMessage(ERRORS.NOT_PROJECT_FOLDER, MANIFEST_XML, this._projectFolder);
		}
	}

	async _getAccountInfoByAuthId(authId) {
		const getAuthListContext = new SDKExecutionContext({
			command: COMMANDS.MANAGEAUTH,
			flags: [FLAGS.LIST],
		});

		const existingAuthIDsResponse = await executeWithSpinner({
			action: this._sdkExecutor.execute(getAuthListContext),
			message: TranslationService.getMessage(MESSAGES.GETTING_AVAILABLE_AUTHIDS),
		});

		if (SDKOperationResultUtils.hasErrors(existingAuthIDsResponse)) {
			throw SDKOperationResultUtils.getResultMessage(existingAuthIDsResponse);
		}
		const authIdData = existingAuthIDsResponse.data[authId];
		if (!authIdData) {
			throw Error(`This authentication ID (${authId}) doesn't exists. Please use an existing one or create a new one.`)
		}
		return authIdData.accountInfo
	}

	async _executeAction(executeActionContext) {
		this._checkWorkingDirectoryContainsValidProject();

		const authId = executeActionContext[NON_INTERACTIVE_ANSWERS.AUTH_ID];
		const saveTokenAccountId = executeActionContext[NON_INTERACTIVE_ANSWERS.SAVE_TOKEN_ACCOUNT_ID];
		const saveTokenTokenId = executeActionContext[NON_INTERACTIVE_ANSWERS.SAVE_TOKEN_ID];
		const saveTokenSecretId = executeActionContext[NON_INTERACTIVE_ANSWERS.SAVE_TOKEN_SECRET];

		let accountInfo;
		let mode;
		if (saveTokenAccountId && saveTokenTokenId && saveTokenSecretId) {
			mode = AUTH_MODE.SAVE_TOKEN;
			const commandParams = {
				authid: authId,
				account: saveTokenAccountId,
				tokenid: saveTokenTokenId,
				tokensecret: saveTokenSecretId,
			};

			if (executeActionContext.url) {
				commandParams.url = executeActionContext.url;
			}

			const operationResult = await this._saveToken(commandParams, false);
			if (SDKOperationResultUtils.hasErrors(operationResult)) {
				throw SDKOperationResultUtils.getErrorMessagesString(operationResult);
			}
			accountInfo = operationResult.data.accountInfo;
		} else {
			mode = AUTH_MODE.REUSE;
			accountInfo = await this._getAccountInfoByAuthId(authId);
		}
		this._authenticationService.setDefaultAuthentication(authId);

		return {
			status: OperationResultStatus.SUCCESS,
			mode: mode,
			authId: authId,
			accountInfo: accountInfo
		};
	}
};
