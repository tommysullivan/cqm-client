var ConfigurationFactory = require('../../../src/classes/configuration/configuration_factory');

describe('ConfigurationFactory', function() {
    var fs,
        utilsFactory,
        Configuration,
        InvalidCommandException,
        InvalidConfigurationOptionException,
        CommandLineOptions,
        JobConfiguration,
        subject,
        jsonFileLoader;

    beforeEach(function() {
        utilsFactory = jasmine.createSpyObj('UtilsFactory', ['process','json','jsonFileLoader']);
        Configuration = jasmine.createSpy('Configuration');
        InvalidCommandException = jasmine.createSpy('InvalidCommandException');
        InvalidConfigurationOptionException = jasmine.createSpy('InvalidConfigurationOptionException');
        CommandLineOptions = jasmine.createSpy('CommandLineOptions');
        JobConfiguration = jasmine.createSpy('JobConfiguration');

        subject = ConfigurationFactory(
            fs,
            utilsFactory,
            Configuration,
            InvalidCommandException,
            InvalidConfigurationOptionException,
            CommandLineOptions,
            JobConfiguration
        );

        jsonFileLoader = {}
        utilsFactory.jsonFileLoader.andReturn(jsonFileLoader);
    });

    it('instantiate ConfigurationFactory, which can be used to create instances of classes in the configuration package', function() {
        expect(subject).toBeDefined();
    });

    //describe('configuration(configurationJSON)', function() {
    //    it('returns result of Configuration(configurationJSON)', function() {
    //        var json = {}
    //        subject.configuration(json)
    //        expect(Configuration).toHaveBeenCalledWith(json, utilsFactory, subject);
    //    });
    //});

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

    //it('loads and parses the JSON in filePath', function() {
    //    subject.loadConfigurationFromFile(filePath);
    //    expect(jsonFileLoader.loadJSONFile).toHaveBeenCalledWith(filePath);
    //});
    //it('passes the loaded and parsed JSON to the configuration factory', function() {
    //    var configurationJSON = {}
    //    jsonFileLoader.loadJSONFile.andReturn(configurationJSON);
    //    subject.loadConfigurationFromFile(filePath);
    //    expect(configurationFactory.configuration).toHaveBeenCalledWith(configurationJSON);
    //});
    //it('returns the resulting Configuration instance provided by the factory', function() {
    //    var configuration = {}
    //    configurationFactory.configuration.andReturn(configuration);
    //    expect(subject.loadConfigurationFromFile(filePath)).toBe(configuration);
    //});
});