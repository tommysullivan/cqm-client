module.exports = function(
    fs,
    utilsFactory,
    Configuration,
    InvalidCommandException,
    InvalidConfigurationOptionException,
    CommandLineOptions,
    JobConfiguration
    ) {
    return {
        commandLineOptions: function() {
            return CommandLineOptions(utilsFactory);
        },
        configuration: function() {
            var configurationFilePath = this.commandLineOptions().configurationFilePath();
            var configurationJSON = utilsFactory.jsonFileLoader().loadJSONFile(configurationFilePath);
            var configuration = Configuration(configurationJSON, utilsFactory, this);
            this.configuration = function() { return configuration; }
            return configuration;
        },
        jobConfiguration: function(jobConfigJSON) {
            return JobConfiguration(jobConfigJSON, utilsFactory);
        },
        invalidCommandException: InvalidCommandException,
        invalidConfigurationOptionException: InvalidConfigurationOptionException
    }
}