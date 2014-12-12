module.exports = function($, sectionNamesOrderedByAppearance) {
    return {
        reportCoverageSectionTotals: function(matchingDOMElement, index, summaryCoverageReportWriter) {
            if(index>3) return;
            var sectionJQueryResult = $(matchingDOMElement);
            var metricsText = sectionJQueryResult.text();
            var quotient = metricsText.substring(metricsText.indexOf('('), metricsText.indexOf(')'));
            var covered = parseInt(quotient.substring(1, quotient.indexOf(' ')));
            var total = parseInt(quotient.substring(quotient.lastIndexOf(' ')+1));
            var sectionName = sectionNamesOrderedByAppearance[index];
            var coverageTotalsSectionWriter = summaryCoverageReportWriter.writeNewTotalsSection(sectionName);

            coverageTotalsSectionWriter.writeCovered(covered);
            coverageTotalsSectionWriter.writeTotal(total);
        }
    }
}