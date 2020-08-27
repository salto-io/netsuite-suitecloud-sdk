/*
 ** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
 ** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */
'use strict';
const _ = require('lodash');
const FileUtils = require('../utils/FileUtils');
const sdkWrapperGenerator = require('../commands/SDKWrapperCommandGenerator');
let COMMANDS_METADATA_CACHE;

function executeForEachCommandMetadata(commandsMetadata, func) {
	for (const commandMetadataId in commandsMetadata) {
		if (commandsMetadata.hasOwnProperty(commandMetadataId)) {
			const commandMetadata = commandsMetadata[commandMetadataId];
			func(commandMetadata);
		}
	}
}

module.exports = class CommandsMetadataService {
	constructor() {}
	initializeCommandsMetadata() {
		const sdkCommandsMetadata = _.cloneDeep(require('../metadata/SDKCommandsMetadata'));
		const nodeCommandsMetadata = _.cloneDeep(require('../metadata/NodeCommandsMetadata'));
		const commandGeneratorsMetadata = require('../metadata/CommandGenerators');
		let combinedMetadata = {
			...sdkCommandsMetadata,
			...nodeCommandsMetadata,
		};
		combinedMetadata = this._transformCommandsOptionsToObject(combinedMetadata);
		combinedMetadata = this._addCommandGeneratorMetadata(commandGeneratorsMetadata, combinedMetadata);
		COMMANDS_METADATA_CACHE = combinedMetadata;
	}

	getCommandsMetadata() {
		return COMMANDS_METADATA_CACHE;
	}

	getCommandMetadataByName(commandName) {
		const commandMetadata = COMMANDS_METADATA_CACHE[commandName];
		if (!commandMetadata) {
			throw `No metadata found or initialized for Command ${commandName}`;
		}
		return commandMetadata;
	}

	_getMetadataFromFile(filepath) {
		if (!FileUtils.exists(filepath)) {
			throw `Commands Metadata in filepath ${filepath} not found`;
		}
		try {
			return FileUtils.readAsJson(filepath);
		} catch (error) {
			throw `Error parsing Commands Metadata from ${filepath}`;
		}
	}

	_transformCommandsOptionsToObject(commandsMetadata) {
		executeForEachCommandMetadata(commandsMetadata, commandMetadata => {
			const optionsTransformedIntoObject = commandMetadata.options.reduce((result, item) => {
				if (item.name == null) {
					throw 'Invalid Metadata, missing "name" property in command options';
				}
				result[item.name] = item;
				return result;
			}, {});
			commandMetadata.options = optionsTransformedIntoObject;
		});
		return commandsMetadata;
	}

	_addCommandGeneratorMetadata(commandGeneratorsMetadata, commandsMetadata) {
		executeForEachCommandMetadata(commandsMetadata, commandMetadata => {
			const generatorMetadata = commandGeneratorsMetadata.find(generatorMetadata => {
				return generatorMetadata.commandName === commandMetadata.name;
			});

			const defaultGenerator = generatorMetadata && generatorMetadata.nonInteractiveGenerator
				? generatorMetadata.nonInteractiveGenerator
				: sdkWrapperGenerator;
			commandMetadata.nonInteractiveGenerator = defaultGenerator;
			commandMetadata.supportsInteractiveMode = false;

			if (generatorMetadata && generatorMetadata.interactiveGenerator) {
				commandMetadata.interactiveGenerator = generatorMetadata.interactiveGenerator;
				commandMetadata.supportsInteractiveMode = true;
			}
		});
		return commandsMetadata;
	}
};
