module.exports = function(indexHTMLPath, coverageJSONPath, causeException) {
    var message = [
        'IstanbulCoverageReporterException',
        'indexHTMLPath:',
        indexHTMLPath,
        'coverageJSONPath:',
        coverageJSONPath,
        "caused by:",
        causeException.toString()
    ].join("\n");
    return new Error(message);
}