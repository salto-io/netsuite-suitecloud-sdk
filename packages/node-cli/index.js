module.exports = {
	CommandsMetadataService: require('./src/core/CommandsMetadataService'),
	CommandActionExecutor: require('./src/core/CommandActionExecutor'),
	CLIConfigurationService: require('./src/core/extensibility/CLIConfigurationService'),
	SdkOperationResultUtils: require('./src/utils/SdkOperationResultUtils'),
	NodeConsoleLogger: require('./src/loggers/NodeConsoleLogger'),
	ActionResultUtils: require('./src/utils/ActionResultUtils'),
	SdkDownloadService: require('./src/core/sdksetup/SdkDownloadService'),
	SdkProperties: require('./src/core/sdksetup/SdkProperties'),
	SDK_VERSION: require('./src/ApplicationConstants').SDK_VERSION,
};
