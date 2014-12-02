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
            return ConfigurationLoaderBasedOnProcessArgs(utilsFactory.process(), this);
        },
        configurationLoaderUsesJobURL: function(jobURL) {
            return ConfigurationLoaderUsesJobURL(fs, jobURL, cqmConfig.jobURLToConfigFilePathMapFilePath, this);
        },
        configurationLoaderUsesFilePath: function(filePath) {
            return ConfigurationLoaderUsesFilePath(filePath, fs, this);
        },
        configurationForJobURLNotFoundException: function(jobURL, configurationFilesKeyedByJobURL) {
            return ConfigurationForJobURLNotFoundException(jobURL, cqmConfig.jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, utilsFactory.json());
        },
        configuration: Configuration,
        invalidCommandException: InvalidCommandException,
        invalidConfigurationOptionException: InvalidConfigurationOptionException
    }
}