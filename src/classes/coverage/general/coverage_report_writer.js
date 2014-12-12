module.exports = function(coverageJSONObject, factory, originalCoverageDataPropertyName) {
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
        if(coverageJSONObject.hasOwnProperty(sectionName)) throwError(sectionTypeName, sectionName);
        var totalsSectionJSONObject = factory.coverageSectionJSONObject();
        coverageJSONObject[sectionName]=totalsSectionJSONObject;
        return totalsSectionJSONObject;
    }
    function throwError(sectionTypeName, sectionName) {
        throw new Error('Cannot add '+sectionTypeName+' section '+sectionName+', it already exists');
    }
}