module.exports = function(fs,
                          coverageCSVFilePath,
                          eclEmmaCoverageCSVParser,
                          eclEmmaClassCoverageReporter
                ) {
    return {
        reportCoverage: function (coverageReportWriter) {
            var coverageCSVFileContent = fs.readFileSync(coverageCSVFilePath).toString();
            var parsedClassCoverageResults = eclEmmaCoverageCSVParser.parseCSVIntoClassCoverageResults(coverageCSVFileContent);
            var summaryGroupCoverageReportWriter = coverageReportWriter.writeNewGroupingSection('summary')
            var classesGroupCoverageReportWriter = coverageReportWriter.writeNewGroupingSection('classes');
            parsedClassCoverageResults.forEach(function(parsedClassCoverageResult) {
                eclEmmaClassCoverageReporter.reportClassCoverages(parsedClassCoverageResult, classesGroupCoverageReportWriter);
            });
            coverageReportWriter.writeOriginalCoverageData(coverageCSVFileContent);
        }
    }


}