var ConfigurationForJobURLNotFoundException = require('../../../classes/configuration/configuration_for_job_url_not_found_exception');

describe('ConfigurationForJobURLNotFoundException', function() {
    var jobURL,
        jobURLToConfigFilePathMapFilePath,
        configurationFilesKeyedByJobURL,
        json,
        jsonStringificationOfConfigurationFilesKeyedByJobURL,
        subject;

    beforeEach(function() {
        jobURL = 'jobURL';
        jobURLToConfigFilePathMapFilePath = 'jobURLToConfigFilePathMapFilePath';
        configurationFilesKeyedByJobURL = {
            "http://some.web.address": "someConfigFilePath",
            "http://some.other.web.address": "someOtherConfigFilePath"
        }
        json = jasmine.createSpyObj('JSON', ['stringify']);
        jsonStringificationOfConfigurationFilesKeyedByJobURL = 'jsonStringificationOfConfigurationFilesKeyedByJobURL';
        json.stringify.andReturn(jsonStringificationOfConfigurationFilesKeyedByJobURL);
        subject = ConfigurationForJobURLNotFoundException(
            jobURL,
            jobURLToConfigFilePathMapFilePath,
            configurationFilesKeyedByJobURL,
            json
        );
    });

    describe('toString', function() {
        it('includes text ConfigurationForJobURLNotFoundException', function() {
            expect(subject.toString()).toContain('ConfigurationForJobURLNotFoundException');
        });
        it('includes the jobURL', function() {
            expect(subject.toString()).toContain(jobURL);
        });
        it('includes the jobURLToConfigFilePathMapFilePath', function() {
            expect(subject.toString()).toContain(jobURLToConfigFilePathMapFilePath);
        });
        it('includes the JSON.stringification of configurationFilesKeyedByJobURL', function() {
            expect(subject.toString()).toContain(jsonStringificationOfConfigurationFilesKeyedByJobURL);
            expect(json.stringify).toHaveBeenCalledWith(configurationFilesKeyedByJobURL);
        });
    });
});