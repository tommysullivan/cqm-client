module.exports = function(configurationJSON, cqmConfigObject) {
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
        }
    }
}