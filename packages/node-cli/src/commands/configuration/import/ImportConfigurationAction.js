/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const { ActionResult } = require('../../../services/actionresult/ActionResult');
const CommandUtils = require('../../../utils/CommandUtils');
const executeWithSpinner = require('../../../ui/CliSpinner').executeWithSpinner;
const BaseAction = require('../../base/BaseAction');
const NodeTranslationService = require('../../../services/NodeTranslationService');
const SdkExecutionContext = require('../../../SdkExecutionContext');
const { getProjectDefaultAuthId } = require('../../../utils/AuthenticationUtils');

const {
	COMMAND_IMPORTCONFIGURATION: { PROGRESS },
} = require('../../../services/TranslationKeys');

const COMMAND_PARAMETERS = {
	AUTH_ID: 'authid',
	PROJECT_FOLDER: 'project',
	CONFIGURATION_ID: 'configurationid',
};

module.exports = class ImportConfigurationAction extends BaseAction {
	constructor(options) {
		super(options);
	}

	preExecute(params) {
		params[COMMAND_PARAMETERS.PROJECT_FOLDER] = CommandUtils.quoteString(this._projectFolder);
		params[COMMAND_PARAMETERS.AUTH_ID] = getProjectDefaultAuthId(this._executionPath);
		return params;
	}

	async execute(params) {
		try {
			const sdkParams = CommandUtils.extractCommandOptions(params, this._commandMetadata);
			const executionContext = SdkExecutionContext.Builder.forCommand(this._commandMetadata.sdkCommand)
				.addParams(sdkParams)
				.build();

			const actionImportConfiguration = this._sdkExecutor.execute(executionContext);
			
			const operationResult = await executeWithSpinner({
				action: actionImportConfiguration,
				message: NodeTranslationService.getMessage(PROGRESS),
			});

			return ActionResult.Builder.withData(operationResult)
				.withCommandParameters(sdkParams)
				.build();
		} catch (error) {
			return ActionResult.Builder.withErrors([error]).build();
		}
	}
};