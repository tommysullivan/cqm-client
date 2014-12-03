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
        istanbulCoverageReporter: function() {
            return IstanbulCoverageReporter(
                utilsFactory.jsonFileLoader(),
                cheerio,
                fs,
                this,
                configuration.indexHTMLPath(),
                configuration.coverageJSONPath(),
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
        reportSender: function(coverageJSONObject) {
            return ReportSender(
                configuration.host(),
                configuration.path(),
                configuration.port(),
                coverageJSONObject,
                utilsFactory.jsonPoster()
            );
        },
        cqmClient: function() {
            var coverageJSONObject = {}
            return CQMClient(
                this.istanbulCoverageReporter(),
                this.coverageReportWriter(coverageJSONObject),
                this.reportSender(coverageJSONObject)
            );
        },
        coverageTotalsSectionWriter: function(sectionJSON) {
            return CoverageTotalsSectionWriter(sectionJSON, this);
        },
        invalidCoverageNumbersException: InvalidCoverageNumbersException,
        istanbulCoverageReporterException: IstanbulCoverageReporterException
    }
}