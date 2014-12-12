module.exports = function(granularCoverageReporters) {
    return {
        reportClassCoverages: function(parsedClassCoverageResult, classesGroupCoverageReportWriter) {
            var classCoverageReportWriter = classesGroupCoverageReportWriter.writeNewGroupingSection(parsedClassCoverageResult.fqn);
            granularCoverageReporters.forEach(function(granularCoverageReporter) {
                granularCoverageReporter.reportGranularCoverage(parsedClassCoverageResult, classCoverageReportWriter);
            });
        }
    }
}