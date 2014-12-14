module.exports = function(configurationJSON, utilsFactory, configurationFactory) {
    return {
        host: function() {
            return configurationJSON.host;
        },
        path: function() {
            return configurationJSON.path;
        },
        port: function() {
            return configurationJSON.port;
        },
        indexHTMLPath: function() {
            return configurationJSON.indexHTMLPath;
        },
        coverageJSONPath: function() {
            return configurationJSON.coverageJSONPath;
        },
        jobConfigs: function() {
            var arrayOfJobConfigInstances = configurationJSON.jobs.map(function(jobConfigJSON) {
                return configurationFactory.jobConfiguration(jobConfigJSON);
            });
            return utilsFactory.collection(arrayOfJobConfigInstances);
        }
    }
}