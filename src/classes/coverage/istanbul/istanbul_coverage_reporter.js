module.exports = function(jsonFileLoader,
                          cheerio,
                          fs,
                          factory,
                          indexHTMLPath,
                          coverageJSONPath,
                          sectionHTMLSelector,
                          istanbulCoverageSectionReporter
    ) {
    return {
        reportCoverage: function(coverageReportWriter) {
            try {
                var indexHTML = fs.readFileSync(indexHTMLPath).toString();
                var $ = cheerio.load(indexHTML);
                var coverageDetailsJSON = jsonFileLoader.loadJSONFile(coverageJSONPath);
                var summaryCoverageReportWriter = coverageReportWriter.writeNewGroupingSection('summary');
                $(sectionHTMLSelector).each(function(index, matchingDOMElement) {
                    istanbulCoverageSectionReporter.reportCoverageSectionTotals(matchingDOMElement, index, summaryCoverageReportWriter);
                });
                coverageReportWriter.writeOriginalCoverageData(coverageDetailsJSON);
            }
            catch(e) {
                throw factory.istanbulCoverageReporterException(indexHTMLPath, coverageJSONPath, e);
            }
        }
    }


}