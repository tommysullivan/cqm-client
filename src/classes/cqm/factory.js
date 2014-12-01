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
    JSONPoster
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
            return IstanbulCoverageReporter(this.jsonFileLoader(), cheerio, fs, this, indexHTMLPath, coverageJSONPath)
        },
        jsonFileLoader: function() {
            return JSONFileLoader(fs, this.json(), this);
        },
        coverageReportWriter: function(coverageJSONObject) {
            return CoverageReportWriter(coverageJSONObject, this);
        },
        jsonPoster: function() {
            return JSONPoster(http, this.json());
        },
        reportSender: function(host, path, coverageJSONObject) {
            return ReportSender(host, path, coverageJSONObject, this.jsonPoster());
        },
        cqmClient: function() {
            //TODO: Put this into configuration:
            var host = 'localhost';
            var path = '/';
            var port = 80;
            var indexHTMLPath = 'some indexHTMLPath';
            var coverageJSONPath = 'some coverageJSONPath';

            var coverageJSONObject = {}
            var coverageReporter = this.istanbulCoverageReporter(indexHTMLPath, coverageJSONPath);
            var coverageReportWriter = this.coverageReportWriter(coverageJSONObject);
            var reportSender = this.reportSender(host, path, port, coverageJSONObject);
            return CQMClient(coverageReporter, coverageReportWriter, reportSender);
        },
        invalidCoverageNumbersException: InvalidCoverageNumbersException,
        coverageTotalsSectionWriter: CoverageTotalsSectionWriter,
        jsonFileLoaderException: JSONFileLoaderException,
        configuration: Configuration,
        invalidCommandException: InvalidCommandException,
        invalidConfigurationOptionException: InvalidConfigurationOptionException,
        undefinedProcessArgumentException: UndefinedProcessArgumentException,
        istanbulCoverageReporterException: IstanbulCoverageReporterException
    }
}