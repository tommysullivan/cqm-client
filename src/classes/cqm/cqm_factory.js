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
    IstanbulCoverageSectionReporter,
    ECLEmmaClassCoverageReporter,
    ECLEmmaGranularCoverageReporter,
    ECLEmmaCoverageReporter,
    ECLEmmaCoverageCSVParser
    ) {
    return {
        eclEmmaGranularCoverageReporter: function(coverageType, coveredPropName, notCoveredPropName) {
            return ECLEmmaGranularCoverageReporter(coverageType, coveredPropName, notCoveredPropName);
        },
        eclEmmaClassCoverageReporter: function() {
            var granularCoverageReporters = [
                this.eclEmmaGranularCoverageReporter('statements', 'instructionMissed','instructionCovered'),
                this.eclEmmaGranularCoverageReporter('branches', 'branchMissed','branchCovered'),
                this.eclEmmaGranularCoverageReporter('functions', 'methodMissed','methodCovered'),
                this.eclEmmaGranularCoverageReporter('lines', 'lineMissed','lineCovered')
            ]
            return ECLEmmaClassCoverageReporter(granularCoverageReporters);
        },
        eclEmmaCoverageCSVParser: function() {
            return ECLEmmaCoverageCSVParser(cqmConfig.eclEmmaCoverageConfig);
        },
        eclEmmaCoverageReporter: function() {
            return ECLEmmaCoverageReporter(fs,
                configuration.eclEmmaCoverageCSVFilePath(),
                this.eclEmmaCoverageCSVParser(),
                this.eclEmmaClassCoverageReporter());
        },
        coverageSectionJSONObject: function() {
            return {}
        },
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
            //coverageJSONObject, factory, originalCoverageDataPropertyName
            return CoverageReportWriter(coverageJSONObject, this, cqmConfig.originalCoverageDataPropertyName);
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