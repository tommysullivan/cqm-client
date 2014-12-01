module.exports = function(coverageJSONObject, factory) {
    return {
        writeNewTotalsSection: function(sectionName) {
            if(!coverageJSONObject.hasOwnProperty('summary')) coverageJSONObject.summary = {}
            var sectionJSONObject = {}
            coverageJSONObject.summary[sectionName]=sectionJSONObject;
            return factory.coverageTotalsSectionWriter(sectionJSONObject);
        },
        writeCoverageDetails: function(coverageDetails) {
            coverageJSONObject.details = coverageDetails;
        }
    }
}