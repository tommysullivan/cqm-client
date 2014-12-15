module.exports = function(
    fs,
    cheerio,
    cqmConfig,
    utilsFactory,
    configurationFactory,
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
    ECLEmmaCoverageCSVParser,
    CoverageJob,
    SimpleCovCoverageReporter
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
        eclEmmaCoverageReporter: function(jobConfig) {
            return ECLEmmaCoverageReporter(fs,
                jobConfig.getConfigValue('coverageCSVFilePath'),
                this.eclEmmaCoverageCSVParser(),
                this.eclEmmaClassCoverageReporter(),
                cqmConfig.summarySectionName,
                cqmConfig.classesSectionName
            );
        },
        coverageSectionJSONObject: function() {
            return {}
        },
        istanbulCoverageReporter: function(jobConfig) {
            var indexHTMLPath = jobConfig.getConfigValue('indexHTMLFilePath');
            var coverageJSONPath = jobConfig.getConfigValue('coverageJSONFilePath');
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
            return CoverageReportWriter(coverageJSONObject, this, cqmConfig.originalCoverageDataPropertyName, utilsFactory.logger());
        },
        reportSender: function(coverageJSONObject) {
            return ReportSender(
                configurationFactory.configuration().host(),
                configurationFactory.configuration().path(),
                configurationFactory.configuration().port(),
                coverageJSONObject,
                utilsFactory.jsonPoster()
            );
        },
        job: function(jobConfig) {
            var coverageJSONObject = {}
            var coverageReporter = this.configuredCoverageReporter(jobConfig);
            var coverageReportWriter = this.coverageReportWriter(coverageJSONObject);
            var reportSender = this.reportSender(coverageJSONObject);
            return CoverageJob(coverageReporter, coverageReportWriter, reportSender);
        },
        simpleCovCoverageReporter: function(jobConfig) {
            return SimpleCovCoverageReporter(
                utilsFactory.jsonFileLoader(),
                jobConfig.getConfigValue('coverageJSONFilePath'),
                cqmConfig.filesSectionName,
                cqmConfig.linesSectionName
            );
        },
        configuredCoverageReporter: function(jobConfig) {
            if(jobConfig.type()=='istanbulHTML') return this.istanbulCoverageReporter(jobConfig);
            if(jobConfig.type()=='eclEmmaCoverage') return this.eclEmmaCoverageReporter(jobConfig);
            if(jobConfig.type()=='simpleCov') return this.simpleCovCoverageReporter(jobConfig);
            throw new Error("Invalid job config type: "+jobConfig.type()+" jobConfig: "+jobConfig.toString());
        },
        cqmClient: function() {
            return CQMClient(
                configurationFactory.commandLineOptions(),
                configurationFactory.configuration(),
                this
            );
        },
        coverageTotalsSectionWriter: function(sectionJSON) {
            return CoverageTotalsSectionWriter(sectionJSON, this);
        },
        invalidCoverageNumbersException: InvalidCoverageNumbersException,
        istanbulCoverageReporterException: IstanbulCoverageReporterException
    }
}