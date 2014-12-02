var ConfigurationFactory = require('../../../src/classes/configuration/configuration_factory');

describe('ConfigurationFactory', function() {
    var fs,
        cqmConfig,
        utilsFactory,
        ConfigurationLoaderBasedOnProcessArgs,
        ConfigurationLoaderUsesJobURL,
        ConfigurationLoaderUsesFilePath,
        ConfigurationForJobURLNotFoundException,
        Configuration,
        InvalidCommandException,
        InvalidConfigurationOptionException,
        subject;

    beforeEach(function() {
        cqmConfig = {
            istanbulSectionHTMLSelector: 'istanbulSectionHTMLSelector'
        }
        utilsFactory = jasmine.createSpyObj('UtilsFactory', ['process','json']);

        Configuration = jasmine.createSpy('Configuration');
        InvalidCommandException = jasmine.createSpy('InvalidCommandException');
        ConfigurationLoaderUsesFilePath = jasmine.createSpy('ConfigurationLoaderUsesFilePath');
        ConfigurationLoaderUsesJobURL = jasmine.createSpy('ConfigurationLoaderUsesJobURL');
        InvalidConfigurationOptionException = jasmine.createSpy('InvalidConfigurationOptionException');
        ConfigurationLoaderBasedOnProcessArgs = jasmine.createSpy('ConfigurationLoaderBasedOnProcessArgs');
        ConfigurationForJobURLNotFoundException = jasmine.createSpy('ConfigurationForJobURLNotFoundException');

        subject = ConfigurationFactory(
            fs,
            cqmConfig,
            utilsFactory,
            ConfigurationLoaderBasedOnProcessArgs,
            ConfigurationLoaderUsesJobURL,
            ConfigurationLoaderUsesFilePath,
            ConfigurationForJobURLNotFoundException,
            Configuration,
            InvalidCommandException,
            InvalidConfigurationOptionException
        );
    });

    it('instantiate ConfigurationFactory, which can be used to create instances of classes in the configuration package', function() {
        expect(subject).toBeDefined();
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
            utilsFactory.process.andReturn(process);
            expect(subject.configurationLoader()).toBe(configurationLoaderBasedOnProcessArgs);
            expect(ConfigurationLoaderBasedOnProcessArgs).toHaveBeenCalledWith(process, subject);
            expect(utilsFactory.process).toHaveBeenCalledWith();
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
            expect(ConfigurationLoaderUsesJobURL).toHaveBeenCalledWith(fs, jobURL, cqmConfig.jobURLToConfigFilePathMapFilePath, subject);
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
            utilsFactory.json.andReturn(json);
            ConfigurationForJobURLNotFoundException.andReturn(configurationForJobURLNotFoundException);

            var result = subject.configurationForJobURLNotFoundException(jobURL, configurationFilesKeyedByJobURL);
            expect(result).toBe(configurationForJobURLNotFoundException);
            expect(ConfigurationForJobURLNotFoundException).toHaveBeenCalledWith(jobURL, cqmConfig.jobURLToConfigFilePathMapFilePath, configurationFilesKeyedByJobURL, json);
        });
    });
});