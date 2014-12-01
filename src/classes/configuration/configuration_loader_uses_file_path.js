module.exports = function(jsonFileLoader, factory) {
    return {
        loadConfigurationFromFile: function(filePath) {
            return factory.configuration(jsonFileLoader.loadJSONFile(filePath));
        }
    }
}