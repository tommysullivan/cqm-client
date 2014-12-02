module.exports = function(
    fs,
    cheerio,
    cqmConfig,
    utilsFactory,
    configuration,
    IstanbulCoverageReporterException,
    IstanbulCoverageReporter,
    CoverageTotalsSectionWriter,
    CoverageReportWriter,
    InvalidCoverageNumbersException,
    CQMClient,
    ReportSender,
    IstanbulCoverageSectionReporter
    ) {
    return {
        istanbulCoverageReporter: function(indexHTMLPath, coverageJSONPath) {
            return IstanbulCoverageReporter(
                utilsFactory.jsonFileLoader(),
                cheerio,
                fs,
                this,
                indexHTMLPath,
                coverageJSONPath,
                cqmConfig.istanbulSectionHTMLSelector,
                this.istanbulCoverageSectionReporter()
            );
        },
        istanbulCoverageSectionReporter: function() {
            var $ = cheerio;
            return IstanbulCoverageSectionReporter($, cqmConfig.istanbulSectionNamesOrderedByAppearance);
        },
        coverageReportWriter: function(coverageJSONObject) {
            return CoverageReportWriter(coverageJSONObject, this);
        },
        reportSender: function(host, path, port, coverageJSONObject) {
            //host, path, port, coverageJSONObject, jsonPoster
            return ReportSender(host, path, port, coverageJSONObject, utilsFactory.jsonPoster());
        },
        cqmClient: function() {
            //TODO: Put this into configuration:
            var host = 'localhost';
            var path = '/';
            var port = 80;
            var indexHTMLPath = 'spec/fixtures/istanbul/index.html';
            var coverageJSONPath = 'spec/fixtures/istanbul/coverage.json';

            var coverageJSONObject = {}
            var coverageReporter = this.istanbulCoverageReporter(indexHTMLPath, coverageJSONPath);
            var coverageReportWriter = this.coverageReportWriter(coverageJSONObject);
            var reportSender = this.reportSender(host, path, port, coverageJSONObject);
            return CQMClient(coverageReporter, coverageReportWriter, reportSender);
        },
        coverageTotalsSectionWriter: function(sectionJSON) {
            return CoverageTotalsSectionWriter(sectionJSON, this);
        },
        invalidCoverageNumbersException: InvalidCoverageNumbersException,
        istanbulCoverageReporterException: IstanbulCoverageReporterException
    }
}