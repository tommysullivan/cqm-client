module.exports = function($, sectionNamesOrderedByAppearance) {
    return {
        writeCoverageSectionTotals: function(matchingDOMElement, index, coverageReportWriter) {
            if(index>3) return;
            var sectionJQueryResult = $(matchingDOMElement);
            var metricsText = sectionJQueryResult.text();
            var quotient = metricsText.substring(metricsText.indexOf('('), metricsText.indexOf(')'));
            var covered = parseInt(quotient.substring(1, quotient.indexOf(' ')));
            var total = parseInt(quotient.substring(quotient.lastIndexOf(' ')+1));
            var sectionName = sectionNamesOrderedByAppearance[index];
            var coverageTotalsSectionWriter = coverageReportWriter.writeNewTotalsSection(sectionName);

            coverageTotalsSectionWriter.writeCovered(covered);
            coverageTotalsSectionWriter.writeTotal(total);
        }
    }
}