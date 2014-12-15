module.exports = function(jsonFileLoader,
                          coverageJSONFilePath,
                          filesSectionName,
                          linesSectionName
) {
    return {
        reportCoverage: function (coverageReportWriter) {
            var simpleCovJSON = jsonFileLoader.loadJSONFile(coverageJSONFilePath);
            var filesSectionWriter = coverageReportWriter.writeNewGroupingSection(filesSectionName);
            var coverageHash = simpleCovJSON.details.RSpec.coverage;
            for(var fileName in coverageHash) {
                var fileCoverageWriter = filesSectionWriter.writeNewGroupingSection(fileName);
                var lineCoveragesWriter = fileCoverageWriter.writeNewTotalsSection(linesSectionName);
                var lineCoverages = coverageHash[fileName];
                var linesCovered = 0;
                var eligibleLines = 0;
                lineCoverages.forEach(function(lineCoverage) {
                    if(lineCoverage==null) return;
                    if(lineCoverage>0) linesCovered++;
                    eligibleLines++;
                });
                lineCoveragesWriter.writeCovered(linesCovered);
                lineCoveragesWriter.writeTotal(eligibleLines);
            }
        }
    }
}