var ConfigurationLoaderUsesFilePath = require('../../../src/classes/configuration/configuration_loader_uses_file_path');

describe('ConfigurationLoaderUsesFilePath', function() {
    var subject, filePath, jsonFileLoader, factory;
    beforeEach(function() {
        filePath = 'filePath';
        jsonFileLoader = jasmine.createSpyObj('JSONFileLoader', ['loadJSONFile']);
        factory = jasmine.createSpyObj('CQMFactory',['configuration']);
        subject = ConfigurationLoaderUsesFilePath(jsonFileLoader, factory);
    });
    describe('loadConfigurationFromFile()', function() {
        it('loads and parses the JSON in filePath', function() {
            subject.loadConfigurationFromFile(filePath);
            expect(jsonFileLoader.loadJSONFile).toHaveBeenCalledWith(filePath);
        });
        it('passes the loaded and parsed JSON to the configuration factory', function() {
            var configurationJSON = {}
            jsonFileLoader.loadJSONFile.andReturn(configurationJSON);
            subject.loadConfigurationFromFile(filePath);
            expect(factory.configuration).toHaveBeenCalledWith(configurationJSON);
        });
        it('returns the resulting Configuration instance provided by the factory', function() {
            var configuration = {}
            factory.configuration.andReturn(configuration);
            expect(subject.loadConfigurationFromFile(filePath)).toBe(configuration);
        });
    });
});