module.exports = function(sectionJSONObject) {
    function updateComputedValues() {
        if(sectionJSONObject.covered!=undefined && sectionJSONObject.total!=undefined) {
            sectionJSONObject.notCovered = sectionJSONObject.total - sectionJSONObject.covered;
            sectionJSONObject.percent = sectionJSONObject.total == 0 ? 0 : sectionJSONObject.covered / sectionJSONObject.total
        }
    }
    return {
        writeCovered: function(covered) {
            sectionJSONObject.covered = covered;
            updateComputedValues();
        },
        writeTotal: function(total) {
            sectionJSONObject.total = total;
            updateComputedValues();
        }
    }
}