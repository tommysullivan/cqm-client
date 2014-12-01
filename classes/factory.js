module.exports = function(
    fs,
    nativeProcess,
    factory,
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
    InvalidCoverageNumbersException
    ) {
    return {
        configurationLoader: function() {
            return ConfigurationLoaderBasedOnProcessArgs(factory.process(), factory);
        },
        process: function() {
            return Process(nativeProcess, factory);
        },
        configurationLoaderUsesJobURL: function(jobURL) {
            return ConfigurationLoaderUsesJobURL(fs, jobURL, jobURLToConfigFilePathMapFilePath, factory);
        },
        configurationLoaderUsesFilePath: function(filePath) {
            return ConfigurationLoaderUsesFilePath(filePath, fs, factory);
        },
        configurationForJobURLNotFoundException: function(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL) {
            return ConfigurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, factory.json());
        },
        json: function() {
            return JSON;
        },
        istanbulCoverageReporter: function(indexHTMLPath, coverageJSONPath) {
            return IstanbulCoverageReporter(factory.jsonFileLoader(), cheerio, fs, factory, indexHTMLPath, coverageJSONPath)
        },
        jsonFileLoader: function() {
            return JSONFileLoader(fs, factory.json(), factory);
        },
        coverageReportWriter: function() {
            return CoverageReportWriter();
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