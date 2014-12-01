var Factory = require('../../classes/factory.js');

describe('Factory', function() {
    var fs,
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
        subject;

    beforeEach(function() {
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        nativeProcess = {}
        factory = jasmine.createSpyObj(
            'Factory',
            [
                'configurationLoaderUsesJobURL',
                'configurationLoaderUsesFilePath',
                'invalidConfigurationOptionException',
                'invalidCommandException',
                'causedException',
                'process',
                'json'
            ]
        );
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
        JSON = {}
        subject = Factory(
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
            CoverageReportWriter
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
        it('returns result of ConfigurationLoaderBasedOnProcessArgs(factory.process(nativeProcess), factory)', function() {
            var configurationLoaderBasedOnProcessArgs = {}
            ConfigurationLoaderBasedOnProcessArgs.andReturn(configurationLoaderBasedOnProcessArgs);
            var process = {}
            factory.process.andReturn(process);
            expect(subject.configurationLoader()).toBe(configurationLoaderBasedOnProcessArgs);
            expect(ConfigurationLoaderBasedOnProcessArgs).toHaveBeenCalledWith(process, factory);
            expect(factory.process).toHaveBeenCalledWith();
        });
    });

    describe('process()', function() {
        it('returns result of Process(nativeProcess)', function() {
            var process = {}
            Process.andReturn(process);
            expect(subject.process()).toBe(process);
            expect(Process).toHaveBeenCalledWith(nativeProcess, factory);
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
        it('returns the result of ConfigurationLoaderUsesJobURL(fs, jobURL, jobURLToConfigFilePathMapFilePath, factory)', function() {
            var configurationLoaderUsesJobURL = {}
            var jobURL = 'jobURL'
            ConfigurationLoaderUsesJobURL.andReturn(configurationLoaderUsesJobURL);
            expect(subject.configurationLoaderUsesJobURL(jobURL)).toBe(configurationLoaderUsesJobURL);
            expect(ConfigurationLoaderUsesJobURL).toHaveBeenCalledWith(fs, jobURL, jobURLToConfigFilePathMapFilePath, factory);
        });
    });

    describe('configurationLoaderUsesFilePath()', function() {
        it('returns the result of ConfigurationLoaderUsesFilePath(fs, jobURL, jobURLToConfigFilePathMapFilePath, factory)', function() {
            var configurationLoaderUsesFilePath = {}
            var filePath = 'filePath'
            ConfigurationLoaderUsesFilePath.andReturn(configurationLoaderUsesFilePath);
            expect(subject.configurationLoaderUsesFilePath(filePath)).toBe(configurationLoaderUsesFilePath);
            expect(ConfigurationLoaderUsesFilePath).toHaveBeenCalledWith(filePath, fs, factory);
        });
    });

    describe('configurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL)', function() {
        it('returns the result of ConfigurationForJobURLNotFoundException(jobURL, jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, factory.json())', function() {
            var configurationForJobURLNotFoundException = {}
            var jobURL = 'jobURL';
            var configurationFilesKeyedByJobURL = {
                "http://some.url": "someFilePath"
            };
            var json = {}
            factory.json.andReturn(json);
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