/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';

const Command = require('../../Command');
const ImportConfigurationAction = require('./ImportConfigurationAction');
const ImportConfigurationOutputHandler = require('./ImportConfigurationOutputHandler');

module.exports = {
	create(options) {
		return Command.Builder.withOptions(options)
			.withAction(ImportConfigurationAction)
			.withOutput(ImportConfigurationOutputHandler)
			.build();
	}
};