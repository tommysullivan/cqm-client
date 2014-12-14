module.exports = function(jobConfigJSON, utilsFactory) {
    return {
        tags: function() {
            return utilsFactory.collection(jobConfigJSON.hasOwnProperty('tags') ? jobConfigJSON.tags : []);
        },
        name: function() {
            return jobConfigJSON.name;
        },
        type: function() {
            return jobConfigJSON.type;
        },
        toString: function() {
            return 'JobConfig: \n' + utilsFactory.json().stringify(jobConfigJSON);
        },
        getConfigValue: function(configKey) {
            return jobConfigJSON[configKey];
        }
    }
}