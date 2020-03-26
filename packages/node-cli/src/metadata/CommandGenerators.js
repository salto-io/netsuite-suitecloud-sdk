module.exports = [
    {
        "commandName": "account:manageauth",
        "supportsInteractiveMode": true,
        "generator": require('../commands/account/manageauth/ManageAccountCommand')
    },
    {
        "commandName": "account:setup",
        "supportsInteractiveMode": true,
        "generator": require('../commands/account/setup/SetupCommand')
    },
    {
        "commandName": "account:setup:ci",
        "supportsInteractiveMode": false,
        "generator": require('./commands/account/setupci/AccountSetupCiCommand')
    },
	{
		"commandName": "file:create",
		"supportsInteractiveMode": true,
		"generator": require('../commands/file/create/CreateFileCommand')
	},
    {
        "commandName": "file:import",
        "supportsInteractiveMode": true,
        "generator": require('../commands/file/import/ImportFilesCommand')
    },
    {
        "commandName": "file:list",
        "supportsInteractiveMode": true,
        "generator": require('../commands/file/list/ListFilesCommand')
    },
    {
        "commandName": "file:upload",
        "supportsInteractiveMode": true,
        "generator": require('../commands/file/upload/UploadFilesCommand')
    },
    {
        "commandName": "object:import",
        "supportsInteractiveMode": true,
        "generator": require('../commands/object/import/ImportObjectsCommand')
    },
    {
        "commandName": "object:list",
        "supportsInteractiveMode": true,
        "generator": require('../commands/object/list/ListObjectsCommand')
    },
    {
        "commandName": "object:update",
        "supportsInteractiveMode": true,
        "generator": require('../commands/object/update/UpdateCommand')
    },
    {
        "commandName": "configuration:import",
        "supportsInteractiveMode": false,
        "generator": require('../commands/configuration/import/ImportConfigurationCommand')
    },
    {
        "commandName": "project:adddependencies",
        "supportsInteractiveMode": false,
        "generator": require('../commands/project/adddependencies/AddDependenciesCommand')
    },
    {
        "commandName": "project:create",
        "supportsInteractiveMode": true,
        "generator": require('../commands/project/create/CreateProjectCommand')
    },
    {
        "commandName": "project:deploy",
        "supportsInteractiveMode": true,
        "generator": require('../commands/project/deploy/DeployCommand')
    },
    {
        "commandName": "project:package",
        "supportsInteractiveMode": true,
        "generator": require('../commands/project/package/PackageCommand')
    },
    {
        "commandName": "project:validate",
        "supportsInteractiveMode": true,
        "generator": require('../commands/project/validate/ValidateCommand')
    },
    {
        "commandName": "object:create",
        "supportsInteractiveMode": true,
        "generator": require('../commands/object/create/CreateObjectCommand')
    }
];
