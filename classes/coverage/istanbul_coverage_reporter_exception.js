module.exports = function(indexHTMLPath, coverageJSONPath, causeException) {
    return {
        toString: function() {
            return [
                'IstanbulCoverageReporterException',
                'indexHTMLPath:',
                indexHTMLPath,
                'coverageJSONPath:',
                coverageJSONPath,
                "caused by:",
                causeException.toString()
            ].join("\n");
        }
    }

}