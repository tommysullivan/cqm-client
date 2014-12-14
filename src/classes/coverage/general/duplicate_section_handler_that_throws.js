module.exports = function() {
    return {
        handleDuplicateSection: function(sectionTypeName, sectionName, coverageJSONObject) {
            throw new Error('Cannot add '+sectionTypeName+' section '+sectionName+', it already exists');
        }
    }
}