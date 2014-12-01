module.exports = function(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, json) {
    var message = [
        "ConfigurationForJobURLNotFoundException - jobURL: ",
        jobURL,
        " jobURLToConfigFilePathMapFilePath: ",
        jobURLToConfigFilePathMapFilePath,
        "configurationFilesKeyedByJobURL: ",
        json.stringify(configurationFilesKeyedByJobURL)
    ].join("\n");
    return new Error(message);
}