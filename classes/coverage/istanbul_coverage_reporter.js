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
        writeCoverageReport: function(coverageReportWriter) {
            try {
                var indexHTML = fs.readFileSync(indexHTMLPath).toString();
                var $ = cheerio.load(indexHTML);
                var coverageDetailsJSON = jsonFileLoader.loadJSONFile(coverageJSONPath);
                $(sectionHTMLSelector).each(function(matchingDOMElement, index) {
                    istanbulCoverageSectionReporter.writeCoverageSectionTotals(matchingDOMElement, index, coverageReportWriter);
                });
                coverageReportWriter.writeCoverageDetails(coverageDetailsJSON);
            }
            catch(e) {
                throw factory.istanbulCoverageReporterException(indexHTMLPath, coverageJSONPath, e);
            }
        }
    }


}