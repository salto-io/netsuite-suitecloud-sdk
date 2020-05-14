/*
** Copyright (c) 2020 Oracle and/or its affiliates.  All rights reserved.
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl.
*/
'use strict';

const BaseCommandGenerator = require('./BaseCommandGenerator');
const OBJECT_TYPES = require('../metadata/ObjectTypesMetadata');
const FileSystemService = require('../services/FileSystemService');
const TemplateKeys = require('../templates/TemplateKeys');
const chalk = require('chalk');
const { join } = require('path');
const NodeUtils = require('../utils/NodeUtils');
const { FOLDERS } = require('../ApplicationConstants');

module.exports = class CreateObjectCommandGenerator extends BaseCommandGenerator {
	constructor(options) {
		super(options);
		this._fileSystemService = new FileSystemService();
	}

	_getCommandQuestions(prompt) {
		const transformFoldersToChoicesFunc = folder => {
			return {name: folder.replace(this._projectFolder, ''), value: folder};
		};
		const objectDirectoryChoices = this._fileSystemService
			.getFoldersFromDirectory(join(this._projectFolder, FOLDERS.OBJECTS))
			.map(transformFoldersToChoicesFunc);

		return prompt([
			{
				type: 'list',
				name: 'type',
				message: 'What object type would you like to create?',
				choices: OBJECT_TYPES,
			},
			{
				type: 'input',
				name: 'objectfilename',
				message: function(answers) {
					return `Please specify the filename for the ${chalk.green.bold(
						answers.type.name
					)} object`;
				},
				transformer: function(input, answers, flags) {
					return `${answers.type.prefix}${input}.xml`;
				},
			},
			{
				type: 'list',
				name: 'folder',
				message: function(answers) {
					return `Where would you like to store the ${chalk.green.bold(
						answers.type.prefix + answers.objectfilename + '.xml'
					)} file?`;
				},
				choices: objectDirectoryChoices,
			},
			{
				type: 'confirm',
				name: 'createrelatedfiles',
				message: 'Would you like to also create associated files with this object?',
				when: function(answers) {
					return answers.type.hasRelatedFiles;
				},
			},
		]).then(mainAnswers => {
			if (mainAnswers.createrelatedfiles) {
				const fileCabinetDirectoryChoices = this._fileSystemService
					.getFoldersFromDirectory(join(this._projectFolder, FOLDERS.FILE_CABINET))
					.map(transformFoldersToChoicesFunc);

				return prompt([
					{
						type: 'input',
						name: 'relatedfilename',
						message: 'Please specify the script filename',
						transformer: function(input, answers, flags) {
							return `${input}.js`;
						},
					},
					{
						type: 'list',
						name: 'relatedfiledestinationfolder',
						message: function(answers) {
							return `Where would you like to store the ${chalk.green.bold(
								answers.relatedfilename
							)}.js file?`;
						},
						choices: fileCabinetDirectoryChoices,
					},
				]).then(answers => {
					return { ...answers, ...mainAnswers };
				});
			}

			return mainAnswers;
		});
	}

	_executeAction(answers) {
		const createFilePromise = this._fileSystemService.createFileFromTemplate({
			template: TemplateKeys.SCRIPTS['blankscript'],
			destinationFolder: answers.relatedfiledestinationfolder,
			fileName: answers.relatedfilename,
			fileExtension: 'js',
		});
		const createObjectPromise = this._fileSystemService.createFileFromTemplate({
			template: TemplateKeys.OBJECTS['commerceextension'],
			destinationFolder: answers.folder,
			fileName: answers.objectfilename,
			fileExtension: 'xml',
			bindings: [{id: 'scriptid', value: answers.type.prefix + answers.objectfilename}],
		});
		return Promise.all([createFilePromise, createObjectPromise]).then(() => {
			NodeUtils.println(
				`${answers.objectfilename} & ${answers.relatedfilename} were created successfully.`,
				NodeUtils.COLORS.INFO);
		});
	}
};
