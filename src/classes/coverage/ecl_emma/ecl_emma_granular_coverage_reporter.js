module.exports = function(coverageType, coveredPropName, notCoveredPropName) {
    return {
        reportGranularCoverage: function(parsedClassCoverageResult, classCoverageReportWriter) {
            var coverageTypeWriter = classCoverageReportWriter.writeNewTotalsSection(coverageType);
            coverageTypeWriter.writeCovered(parsedClassCoverageResult[coveredPropName]);
            coverageTypeWriter.writeNotCovered(parsedClassCoverageResult[notCoveredPropName]);
        }
    }
}