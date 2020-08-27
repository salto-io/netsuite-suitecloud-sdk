/*
** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
'use strict';

module.exports = {
	SCRIPTS: {
		blankscript: require('./scripts/blankscript.js'),
	},
	OBJECTS: {
		commerceextension: require('./objects/commerceextension.js'),
	},
	PROJECTCONFIGS: {
		cliconfig: require('./projectconfigs/suitecloud.config.js'),
	},
	UNIT_TEST: {
		cliconfig: require('./unittest/suitecloud.config.js.template.js'),
		jestconfig: require('./unittest/jest.config.js.template.js'),
		packagejson: require('./unittest/package.json.template.js'),
		sampletest: require('./unittest/sample-test.js.template.js'),
	}
};
