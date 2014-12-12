module.exports = function(fs,
                          coverageCSVFilePath,
                          eclEmmaCoverageCSVParser,
                          eclEmmaClassCoverageReporter,
                          summarySectionName,
                          classesSectionName
                ) {
    return {
        reportCoverage: function (coverageReportWriter) {
            var coverageCSVFileContent = fs.readFileSync(coverageCSVFilePath).toString();
            var parsedClassCoverageResults = eclEmmaCoverageCSVParser.parseCSVIntoClassCoverageResults(coverageCSVFileContent);
            var summaryGroupCoverageReportWriter = coverageReportWriter.writeNewGroupingSection(summarySectionName)
            var classesGroupCoverageReportWriter = coverageReportWriter.writeNewGroupingSection(classesSectionName);
            parsedClassCoverageResults.forEach(function(parsedClassCoverageResult) {
                eclEmmaClassCoverageReporter.reportClassCoverages(parsedClassCoverageResult, classesGroupCoverageReportWriter);
            });
            coverageReportWriter.writeOriginalCoverageData(coverageCSVFileContent);
        }
    }


}