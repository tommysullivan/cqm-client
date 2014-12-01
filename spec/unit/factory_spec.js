var Factory = require('../../src/classes/cqm/factory.js');

describe('Factory', function() {
    var fs,
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
        subject;

    beforeEach(function() {
        http = jasmine.createSpyObj('http', ['a']);
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        nativeProcess = {}
        cheerio = jasmine.createSpyObj('cheerio', ['load']);
        jobURLToConfigFilePathMapFilePath = 'jobURLToConfigFilePathMapFilePath';
        Configuration = jasmine.createSpy('Configuration');
        InvalidCommandException = jasmine.createSpy('InvalidCommandException');
        ConfigurationLoaderUsesFilePath = jasmine.createSpy('ConfigurationLoaderUsesFilePath');
        ConfigurationLoaderUsesJobURL = jasmine.createSpy('ConfigurationLoaderUsesJobURL');
        Process = jasmine.createSpy('Process');
        InvalidConfigurationOptionException = jasmine.createSpy('InvalidConfigurationOptionException');
        ConfigurationLoaderBasedOnProcessArgs = jasmine.createSpy('ConfigurationLoaderBasedOnProcessArgs');
        ConfigurationForJobURLNotFoundException = jasmine.createSpy('ConfigurationForJobURLNotFoundException');
        UndefinedProcessArgumentException = jasmine.createSpy('UndefinedProcessArgumentException');
        JSONFileLoaderException = jasmine.createSpy('JSONFileLoaderException');
        IstanbulCoverageReporterException = jasmine.createSpy('IstanbulCoverageReporterException');
        IstanbulCoverageReporter = jasmine.createSpy('IstanbulCoverageReporter');
        JSONFileLoader = jasmine.createSpy('JSONFileLoader');
        CoverageTotalsSectionWriter = jasmine.createSpy('CoverageTotalsSectionWriter');
        CoverageReportWriter = jasmine.createSpy('CoverageReportWriter');
        InvalidCoverageNumbersException = jasmine.createSpy('InvalidCoverageNumbersException');
        JSON = {}
        subject = Factory(
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
        );
    });

    describe('configuration(configurationJSON)', function() {
        it('returns result of Configuration(configurationJSON)', function() {
            var json = {}
            subject.configuration(json)
            expect(Configuration).toHaveBeenCalledWith(json);
        });
    });

    describe('configurationLoader()', function() {
        it('returns result of ConfigurationLoaderBasedOnProcessArgs(subject.process(nativeProcess), subject)', function() {
            var configurationLoaderBasedOnProcessArgs = {}
            ConfigurationLoaderBasedOnProcessArgs.andReturn(configurationLoaderBasedOnProcessArgs);
            var process = {}
            subject.process = jasmine.createSpy('process');
            subject.process.andReturn(process);
            expect(subject.configurationLoader()).toBe(configurationLoaderBasedOnProcessArgs);
            expect(ConfigurationLoaderBasedOnProcessArgs).toHaveBeenCalledWith(process, subject);
            expect(subject.process).toHaveBeenCalledWith();
        });
    });

    describe('process()', function() {
        it('returns result of Process(nativeProcess)', function() {
            var process = {}
            Process.andReturn(process);
            expect(subject.process()).toBe(process);
            expect(Process).toHaveBeenCalledWith(nativeProcess, subject);
        });
    });

    describe('invalidCommandException(causeException)', function() {
        it('returns the result of InvalidCommandException(causeException)', function() {
            var causeException = {};
            var invalidCommandException = {}
            InvalidCommandException.andReturn(invalidCommandException);
            expect(subject.invalidCommandException(causeException)).toBe(invalidCommandException);
            expect(InvalidCommandException).toHaveBeenCalledWith(causeException);
        });
    });

    describe('invalidConfigurationOptionException(providedConfigurationOption)', function() {
        it('returns the result of InvalidConfigurationOptionException(providedConfigurationOption)', function() {
            var providedConfigurationOption = 'providedConfigurationOption';
            var invalidConfigurationOptionException = {}
            InvalidConfigurationOptionException.andReturn(invalidConfigurationOptionException);
            expect(subject.invalidConfigurationOptionException(providedConfigurationOption)).toBe(invalidConfigurationOptionException);
            expect(InvalidConfigurationOptionException).toHaveBeenCalledWith(providedConfigurationOption);
        });
    });

    describe('configurationLoaderUsesJobURL(jobURL)', function() {
        it('returns the result of ConfigurationLoaderUsesJobURL(fs, jobURL, jobURLToConfigFilePathMapFilePath, subject)', function() {
            var configurationLoaderUsesJobURL = {}
            var jobURL = 'jobURL'
            ConfigurationLoaderUsesJobURL.andReturn(configurationLoaderUsesJobURL);
            expect(subject.configurationLoaderUsesJobURL(jobURL)).toBe(configurationLoaderUsesJobURL);
            expect(ConfigurationLoaderUsesJobURL).toHaveBeenCalledWith(fs, jobURL, jobURLToConfigFilePathMapFilePath, subject);
        });
    });

    describe('configurationLoaderUsesFilePath()', function() {
        it('returns the result of ConfigurationLoaderUsesFilePath(fs, jobURL, jobURLToConfigFilePathMapFilePath, subject)', function() {
            var configurationLoaderUsesFilePath = {}
            var filePath = 'filePath'
            ConfigurationLoaderUsesFilePath.andReturn(configurationLoaderUsesFilePath);
            expect(subject.configurationLoaderUsesFilePath(filePath)).toBe(configurationLoaderUsesFilePath);
            expect(ConfigurationLoaderUsesFilePath).toHaveBeenCalledWith(filePath, fs, subject);
        });
    });

    describe('configurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL)', function() {
        it('returns the result of ConfigurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, subject.json())', function() {
            var configurationForJobURLNotFoundException = {}
            var jobURL = 'jobURL';
            var configurationFilesKeyedByJobURL = {
                "http://some.url": "someFilePath"
            };
            var json = {}
            subject.json = jasmine.createSpy('json');
            subject.json.andReturn(json);
            var jobURLToConfigFilePathMapFilePath = 'jobURLToConfigFilePathMapFilePath';
            ConfigurationForJobURLNotFoundException.andReturn(configurationForJobURLNotFoundException);

            var result = subject.configurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL);
            expect(result).toBe(configurationForJobURLNotFoundException);
            expect(ConfigurationForJobURLNotFoundException).toHaveBeenCalledWith(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, json);
        });
    });

    describe('json()', function() {
        it('returns JSON that was passed into the constructor', function() {
            expect(subject.json()).toBe(JSON);
        });
    })

    describe('undefinedProcessArgumentException(argumentIndex)', function() {
        it('returns UndefinedProcessArgumentException(argumentIndex)', function() {
            var argumentIndex = 5;
            var undefinedProcessArgumentException = {}
            UndefinedProcessArgumentException.andReturn(undefinedProcessArgumentException);
            expect(subject.undefinedProcessArgumentException(argumentIndex)).toBe(undefinedProcessArgumentException);
            expect(UndefinedProcessArgumentException).toHaveBeenCalledWith(argumentIndex);
        })
    })
});