module.exports = {
	CommandsMetadataService: require('./src/core/CommandsMetadataService'),
	CommandActionExecutor: require('./src/core/CommandActionExecutor'),
	CommandInstanceFactory: require('./src/core/CommandInstanceFactory'),
	CommandOptionsValidator: require('./src/core/CommandOptionsValidator'),
	CommandOutputHandler: require('./src/core/CommandOutputHandler'),
	CLIConfigurationService: require('./src/core/extensibility/CLIConfigurationService'),
	AuthenticationService: require('./src/core/authentication/AuthenticationService'),
	SDKOperationResultUtils: require('./src/utils/SDKOperationResultUtils'),
	SDKDownloadService: require('./src/core/sdksetup/SDKDownloadService')
};
