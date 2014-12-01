module.exports = function(jsonFileLoader, jobURLToConfigFilePathMapFilePath, factory, configurationLoaderUsesFilePath) {
    return {
        loadConfigurationForURL: function(jobURL) {
            var configurationFilePathsKeyedByJobURL = jsonFileLoader.loadJSONFile(jobURLToConfigFilePathMapFilePath);
            var configFilePath = configurationFilePathsKeyedByJobURL[jobURL];
            if(configFilePath==undefined) throw factory.configurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilePathsKeyedByJobURL);
            return configurationLoaderUsesFilePath.loadConfigurationFromFile(configFilePath);
        }
    }
}