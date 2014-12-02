module.exports = function(
    fs,
    cqmConfig,
    utilsFactory,
    ConfigurationLoaderBasedOnProcessArgs,
    ConfigurationLoaderUsesJobURL,
    ConfigurationLoaderUsesFilePath,
    ConfigurationForJobURLNotFoundException,
    Configuration,
    InvalidCommandException,
    InvalidConfigurationOptionException
    ) {
    return {
        configurationLoader: function() {
            return ConfigurationLoaderBasedOnProcessArgs(
                utilsFactory.process(),
                this,
                this.configurationLoaderUsesJobURL(),
                this.configurationLoaderUsesFilePath()
            );
        },
        configurationLoaderUsesJobURL: function() {
            return ConfigurationLoaderUsesJobURL(utilsFactory.jsonFileLoader(), cqmConfig.jobURLToConfigFilePathMapFilePath, this, this.configurationLoaderUsesFilePath());
        },
        configurationLoaderUsesFilePath: function() {
            return ConfigurationLoaderUsesFilePath(utilsFactory.jsonFileLoader(), this);
        },
        configurationForJobURLNotFoundException: function(jobURL, configurationFilesKeyedByJobURL) {
            return ConfigurationForJobURLNotFoundException(jobURL, cqmConfig.jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, utilsFactory.json());
        },
        configuration: Configuration,
        invalidCommandException: InvalidCommandException,
        invalidConfigurationOptionException: InvalidConfigurationOptionException
    }
}