/*
** Copyright (c) 2021 Oracle and/or its affiliates.  All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
'use strict';

module.exports = {
	SCRIPTS: {
		blankscript: require('./scripts/blankscript.js'),
	},
	OBJECTS: {
		commerceextension: require('./objects/commerceextension.xml'),
	},
	PROJECTCONFIGS: {
		cliconfig: require('./projectconfigs/suitecloud.config.js'),
		gitignore: require('./projectconfigs/default_gitignore')
	},
	UNIT_TEST: {
		cliconfig: require('./unittest/suitecloud.config.js.template'),
		jestconfig: require('./unittest/jest.config.js.template'),
		packagejson: require('./unittest/package.json.template'),
		sampletest: require('./unittest/sample-test.js.template'),
	}
};
