module.exports = function(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, json) {
    return {
        toString: function() {
            return [
                "ConfigurationForJobURLNotFoundException - jobURL: ",
                 jobURL,
                " jobURLToConfigFilePathMapFilePath: ",
                jobURLToConfigFilePathMapFilePath,
                "configurationFilesKeyedByJobURL: ",
                json.stringify(configurationFilesKeyedByJobURL)
            ].join("\n");
        }
    }
}