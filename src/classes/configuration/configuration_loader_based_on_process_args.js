module.exports = function(process, factory, configurationLoaderUsesJobURL, configurationLoaderUsesFilePath) {
    return {
        loadConfiguration: function() {
            try {
                var configType = process.argumentAtIndex(2);
                var configInput = process.argumentAtIndex(3);
                switch(configType) {
                    case '-jobURL': return configurationLoaderUsesJobURL.loadConfigurationForURL(configInput);
                    case '-configPath': return configurationLoaderUsesFilePath.loadConfigurationFromFile(configInput);
                    default: throw factory.invalidConfigurationOptionException(configType);
                }
            }
            catch(e) {
                throw factory.invalidCommandException(e);
            }
        }
    }
}