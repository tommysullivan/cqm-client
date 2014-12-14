module.exports = function(sectionJSON, factory) {
    return {
        writeCovered: function(covered) {
            sectionJSON.covered = covered;
            computeTotalIfPossibleAndNeeded();
            computeNotCoveredIfPossibleAndNeeded();
            computePercentIfPossibleAndNeeded();
            validate();
        },
        writeTotal: function(total) {
            sectionJSON.total = total;
            computeCoveredIfIfPossibleAndNeeded();
            computeNotCoveredIfPossibleAndNeeded();
            computePercentIfPossibleAndNeeded();
            validate();
        },
        writeNotCovered: function(notCovered) {
            sectionJSON.notCovered=notCovered;
            computeTotalIfPossibleAndNeeded();
            computeCoveredIfIfPossibleAndNeeded();
            computePercentIfPossibleAndNeeded();
            validate();
        }
    }
    function sufficientQuantitiesAreDefined() {
        return sectionJSON.total!=undefined && sectionJSON.covered!=undefined && sectionJSON.notCovered!=undefined;
    }
    function mathDoesNotAddUp() {
        return sectionJSON.covered + sectionJSON.notCovered != sectionJSON.total;
    }
    function quantitiesAreNegative() {
        return sectionJSON.covered < 0 || sectionJSON.notCovered < 0 || sectionJSON.total < 0;
    }
    function validate() {
        if(sufficientQuantitiesAreDefined() && (mathDoesNotAddUp() || quantitiesAreNegative()))
            throw factory.invalidCoverageNumbersException(sectionJSON.total, sectionJSON.covered, sectionJSON.notCovered);
    }
    function computeTotalIfPossibleAndNeeded() {
        if(sectionJSON.total==undefined || sectionJSON.total==0)
            if(sectionJSON.covered!=undefined && sectionJSON.notCovered!=undefined)
                sectionJSON.total = sectionJSON.covered + sectionJSON.notCovered;
    }
    function computeNotCoveredIfPossibleAndNeeded() {
        if(sectionJSON.notCovered==undefined)
            if(sectionJSON.covered!=undefined && sectionJSON.total!=undefined)
                sectionJSON.notCovered = sectionJSON.total - sectionJSON.covered;
    }
    function computeCoveredIfIfPossibleAndNeeded() {
        if(sectionJSON.covered==undefined)
            if(sectionJSON.notCovered!=undefined && sectionJSON.total!=undefined)
                sectionJSON.covered = sectionJSON.total - sectionJSON.notCovered;
    }
    function computePercentIfPossibleAndNeeded() {
        if(sectionJSON.percent==undefined)
            if(sectionJSON.covered!=undefined && sectionJSON.total!=undefined)
                sectionJSON.percent = sectionJSON.total==0 ? 0 : sectionJSON.covered / sectionJSON.total;
    }
}