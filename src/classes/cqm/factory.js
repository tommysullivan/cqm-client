module.exports = function(
    fs,
    http,
    nativeProcess,
    cheerio,
    jobURLToConfigFilePathMapFilePath,
    Configuration,
    InvalidCommandException,
    ConfigurationLoaderUsesFilePath,
    ConfigurationLoaderUsesJobURL,
    Process,
    InvalidConfigurationOptionException,
    ConfigurationLoaderBasedOnProcessArgs,
    ConfigurationForJobURLNotFoundException,
    JSON,
    UndefinedProcessArgumentException,
    JSONFileLoaderException,
    IstanbulCoverageReporterException,
    IstanbulCoverageReporter,
    JSONFileLoader,
    CoverageTotalsSectionWriter,
    CoverageReportWriter,
    InvalidCoverageNumbersException,
    CQMClient,
    ReportSender,
    JSONPoster,
    FakeJSONPoster,
    Logger,
    IstanbulCoverageSectionReporter
    ) {
    return {
        configurationLoader: function() {
            return ConfigurationLoaderBasedOnProcessArgs(this.process(), this);
        },
        process: function() {
            return Process(nativeProcess, this);
        },
        configurationLoaderUsesJobURL: function(jobURL) {
            return ConfigurationLoaderUsesJobURL(fs, jobURL, jobURLToConfigFilePathMapFilePath, this);
        },
        configurationLoaderUsesFilePath: function(filePath) {
            return ConfigurationLoaderUsesFilePath(filePath, fs, this);
        },
        configurationForJobURLNotFoundException: function(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL) {
            return ConfigurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, this.json());
        },
        json: function() {
            return JSON;
        },
        istanbulCoverageReporter: function(indexHTMLPath, coverageJSONPath) {
            var sectionHTMLSelector = '.metric';
            return IstanbulCoverageReporter(
                this.jsonFileLoader(),
                cheerio,
                fs,
                this,
                indexHTMLPath,
                coverageJSONPath,
                sectionHTMLSelector,
                this.istanbulCoverageSectionReporter()
            );
        },
        istanbulCoverageSectionReporter: function() {
            var sectionNamesOrderedByAppearance = ['statements','branches','functions','lines'];
            var $ = cheerio;
            return IstanbulCoverageSectionReporter($, sectionNamesOrderedByAppearance);
        },
        jsonFileLoader: function() {
            return JSONFileLoader(fs, this.json(), this);
        },
        coverageReportWriter: function(coverageJSONObject) {
            return CoverageReportWriter(coverageJSONObject, this);
        },
        jsonPoster: function() {
            //return JSONPoster(http, this.json());
            return FakeJSONPoster(this.logger(), this.json());
        },
        reportSender: function(host, path, port, coverageJSONObject) {
            //host, path, port, coverageJSONObject, jsonPoster
            return ReportSender(host, path, port, coverageJSONObject, this.jsonPoster());
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
        logger: Logger,
        invalidCoverageNumbersException: InvalidCoverageNumbersException,
        jsonFileLoaderException: JSONFileLoaderException,
        configuration: Configuration,
        invalidCommandException: InvalidCommandException,
        invalidConfigurationOptionException: InvalidConfigurationOptionException,
        undefinedProcessArgumentException: UndefinedProcessArgumentException,
        istanbulCoverageReporterException: IstanbulCoverageReporterException
    }
}