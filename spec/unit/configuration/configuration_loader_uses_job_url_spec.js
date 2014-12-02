var ConfigurationLoaderUsesJobURL = require('../../../src/classes/configuration/configuration_loader_uses_job_url');

describe('ConfigurationLoaderUsesJobURL', function() {
    var subject,
        jobURL,
        jsonFileLoader,
        factory,
        jobURLToConfigFilePathMapFilePath,
        configurationFilesKeyedByJobURL,
        filePath,
        configFile,
        configurationLoaderUsesFilePath,
        configurationForJobURLNotFoundException;

    beforeEach(function() {
        jobURL = 'jobURL';
        filePath = 'filePath';
        jobURLToConfigFilePathMapFilePath = 'jobURLToConfigFilePathMapFilePath';
        configurationFilesKeyedByJobURL = {
            otherJobURL: 'wrongFilePath'
        }
        configFile = {}
        jsonFileLoader = jasmine.createSpyObj('JSONFileLoader', ['loadJSONFile']);
        jsonFileLoader.loadJSONFile.andCallFake(function(path) {
            if(path==jobURLToConfigFilePathMapFilePath) return configurationFilesKeyedByJobURL;
            if(path==filePath) return configFile;
            throw new Error("error in test");
        });
        factory = jasmine.createSpyObj('CQMFactory',['configuration', 'configurationForJobURLNotFoundException']);
        configurationForJobURLNotFoundException = {}
        factory.configurationForJobURLNotFoundException.andReturn(configurationForJobURLNotFoundException);
        configurationLoaderUsesFilePath = jasmine.createSpyObj('ConfigurationLoaderUsesFilePath', ['loadConfigurationFromFile']);
        subject = ConfigurationLoaderUsesJobURL(
            jsonFileLoader,
            jobURLToConfigFilePathMapFilePath,
            factory,
            configurationLoaderUsesFilePath
        );
    });
    describe('loadConfigurationForURL(jobURL)', function() {
        it('loads and parses the jobURLToConfigFilePathMapFile JSON from jobURLToConfigFilePathMapFilePath', function() {
            expect(function() { subject.loadConfigurationForURL(jobURL) }).toThrow();
            expect(jsonFileLoader.loadJSONFile).toHaveBeenCalledWith(jobURLToConfigFilePathMapFilePath);
        });
        describe('when there is no key matching the sought url', function() {
            it('calls factory.configurationForJobURLNotFoundException passing jobURL', function() {
                expect(function() { subject.loadConfigurationForURL(jobURL) }).toThrow();
                expect(factory.configurationForJobURLNotFoundException).toHaveBeenCalledWith(jobURL, configurationFilesKeyedByJobURL);
            });
            it('throws the exception returned by the factory', function() {
                var configurationForJobURLNotFoundException = {}
                factory.configurationForJobURLNotFoundException.andReturn(configurationForJobURLNotFoundException);
                expect(function() { subject.loadConfigurationForURL(jobURL) }).toThrow(configurationForJobURLNotFoundException);
            });
        });
        describe('when there is a key matching the sought url', function() {
            beforeEach(function() {
                configurationFilesKeyedByJobURL.jobURL = filePath;
            });
            it('asks configurationLoaderUsesFilePath to load the file with the path', function() {
                subject.loadConfigurationForURL(jobURL);
                expect(configurationLoaderUsesFilePath.loadConfigurationFromFile).toHaveBeenCalledWith(filePath);
            });
            it('returns the resulting configuration', function() {
                var configuration = {}
                configurationLoaderUsesFilePath.loadConfigurationFromFile.andReturn(configuration);
                expect(subject.loadConfigurationForURL(jobURL)).toBe(configuration);
            });
        });
    });
});