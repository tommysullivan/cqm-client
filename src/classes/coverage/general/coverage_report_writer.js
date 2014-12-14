module.exports = function(coverageJSONObject, factory, originalCoverageDataPropertyName, logger) {
    return {
        writeNewGroupingSection: function(sectionName) {
            var newJSONSection = writeNewSection('grouping', sectionName);
            return factory.coverageReportWriter(newJSONSection);
        },
        writeNewTotalsSection: function(sectionName) {
            var newJSONSection =  writeNewSection('totals', sectionName);
            return factory.coverageTotalsSectionWriter(newJSONSection);
        },
        writeOriginalCoverageData: function(originalCoverageData) {
            if(coverageJSONObject.hasOwnProperty(originalCoverageDataPropertyName)) throw new Error("Cannot write original coverage data, it was already written");
            coverageJSONObject[originalCoverageDataPropertyName] = originalCoverageData;
        }
    }
    function writeNewSection(sectionTypeName, sectionName) {
        if(coverageJSONObject.hasOwnProperty(sectionName)) {
            logger.warn('Duplicate section of type: '+sectionTypeName+', name: '+sectionName+'. Data in this section may be lost or overwritten.');
        }
        var totalsSectionJSONObject = factory.coverageSectionJSONObject();
        coverageJSONObject[sectionName]=totalsSectionJSONObject;
        return totalsSectionJSONObject;
    }
}