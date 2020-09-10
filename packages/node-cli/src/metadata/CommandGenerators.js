module.exports = [
    {
        "commandName": "account:savetoken",
        "supportsInteractiveMode": false,
        "generator": require('../commands/account/savetoken/AccountSaveTokenCommand')
    },
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
        "commandName": "config:proxy",
        "supportsInteractiveMode": false,
        "generator": require('../commands/config/proxy/ProxyCommand')
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
        "commandName": "suitecommerce:localserver",
        "supportsInteractiveMode": true,
        "generator": require('../commands/suitecommerce/localserver/LocalServerCommand')
    },
    {
        "commandName": "object:create",
        "supportsInteractiveMode": true,
        "generator": require('../commands/object/create/CreateObjectCommand')
    }
];
