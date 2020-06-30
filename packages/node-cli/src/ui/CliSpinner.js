/*
** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
'use strict';

const assert = require('assert');
const Spinner = require('cli-spinner').Spinner;
const { compareLogLevels, logger } = require('@salto-io/logging');

const SPINNER_STRING = '⠋⠙⠹⠸⠼⠴⠦⠧⠏';

const currentLogLevel = logger.config.minLevel;
const verbose = currentLogLevel !== 'none'
	&& compareLogLevels(currentLogLevel, 'debug') >= 0;

module.exports = {
	async executeWithSpinner(context) {
		assert(context.action instanceof Promise, 'Promise is expected');
		assert(context.message, 'Message is mandatory when spinner is enabled');

		const promise = context.action;
		const message = context.message;

		const spinner = new Spinner(message);
		// TODO: set spinner string conditionally based on the terminal cli is executed in
		// spinner.setSpinnerString(SPINNER_STRING);
		const showSpinner = verbose || context.verbose
		try {
			if (showSpinner) {
				spinner.start();
			}
			const result = await promise;
			if (showSpinner) {
				spinner.stop(true);
			}
			return result;
		} catch (error) {
			if (showSpinner) {
				spinner.stop(true);
			}
			throw error;
		}
	}
};
