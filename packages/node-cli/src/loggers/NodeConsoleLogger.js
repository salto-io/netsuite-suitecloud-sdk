/*
 ** Copyright (c) 2024 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const { logger } = require('@salto-io/logging');
const ConsoleLogger = require('./ConsoleLogger');
const chalk = require('chalk');

const COLORS = {
	DEFAULT: chalk.white,
	RESULT: chalk.green,
	ERROR: chalk.red,
	INFO: chalk.cyan,
	WARNING: chalk.yellow,
};

const log = logger(module);

class NodeConsoleLogger extends ConsoleLogger {

	info(message) {
		return this._println(message, COLORS.INFO);
	}

	result(message) {
		return this._println(message, COLORS.RESULT);
	}

	warning(message) {
		return this._println(message, COLORS.WARNING);
	}

	error(message) {
		return this._println(message, COLORS.ERROR);
	}

	_println(message, color) {
		log.debug(color(message));
	}

}

module.exports = new NodeConsoleLogger();