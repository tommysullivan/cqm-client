module.exports = function(coverageType, coveredPropName, notCoveredPropName) {
    return {
        reportGranularCoverage: function(parsedClassCoverageResult, classCoverageReportWriter) {
            var granularCoverageTotalsWriter = classCoverageReportWriter.writeNewTotalsSection(coverageType);
            granularCoverageTotalsWriter.writeCovered(parsedClassCoverageResult[coveredPropName]);
            granularCoverageTotalsWriter.writeNotCovered(parsedClassCoverageResult[notCoveredPropName]);
        }
    }
}