module.exports = [
    {
        "commandName": "project:adddependencies",
        "nonInteractiveGenerator": require("../commands/AddDependenciesCommandGenerator")
    },
    {
        "commandName": "object:create",
        "interactiveGenerator": require("../commands/CreateObjectCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/CreateObjectCommandGenerator")
    },
    {
        "commandName": "project:create",
        "interactiveGenerator": require("../commands/CreateProjectCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/CreateProjectCommandGenerator")
    },
    {
        "commandName": "project:deploy",
        "interactiveGenerator": require("../commands/DeployCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/DeployCommandGenerator")
    },
    {
        "commandName": "file:import",
        "interactiveGenerator": require("../commands/ImportFilesCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/ImportFilesCommandGenerator")
    },
    {
        "commandName": "object:import",
        "interactiveGenerator": require("../commands/ImportObjectsCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/ImportObjectsCommandGenerator")
    },
    {
        "commandName": "file:list",
        "interactiveGenerator": require("../commands/ListFilesCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/ListFilesCommandGenerator")
    },
    {
        "commandName": "object:list",
        "interactiveGenerator": require("../commands/ListObjectsCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/ListObjectsCommandGenerator")
    },
    {
        "commandName": "suitecommerce:localserver",
        "interactiveGenerator": require("../commands/LocalServerCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/LocalServerCommandGenerator")
    },
    {
        "commandName": "config:proxy",
        "nonInteractiveGenerator": require("../commands/ProxyCommandGenerator")
    },
    {
        "commandName": "account:setup",
        "interactiveGenerator": require("../commands/SetupCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/SetupNonInteractiveCommandGenerator")
    },
    {
        "commandName": "object:update",
        "interactiveGenerator": require("../commands/UpdateCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/UpdateCommandGenerator")
    },
    {
        "commandName": "project:validate",
        "interactiveGenerator": require("../commands/ValidateCommandGenerator"),
        "nonInteractiveGenerator": require("../commands/ValidateCommandGenerator")
    }
]
