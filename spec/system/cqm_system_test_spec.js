var fs = require('fs');
var configPath = 'spec/fixtures/inputs/configurations/dummy_system_test_config.json';
var expectedJSONPath = 'spec/fixtures/expected_outputs/';
var istanbulExpectedResultPath = expectedJSONPath+'istanbul_coverage_output.json';
var eclEmmaExpectedResultPath =  expectedJSONPath+'ecl_emma_coverage_output.json';
var utilsFactoryObjectPath = '../../src/objects/utils_factory_object';
var runCQMClientScriptPath = '../../src/scripts/run_cqm_client';

describe('CQM System Test', function() {
    it('calls the cqm client script located at '+runCQMClientScriptPath);
    describe('faking the command line arguments', function() {
        it('to use configuration located at '+configPath);
        it('and to run jobs tagged as "systemTest"');
    });
    it('intercepts would-be HTTP posts of result content and verifies it matches the expected JSON located in '+expectedJSONPath, function() {

        var expectedIstanbulJSON = JSON.parse(fs.readFileSync(istanbulExpectedResultPath));
        var expectedEclEmmaJSON = JSON.parse(fs.readFileSync(eclEmmaExpectedResultPath));

        var utilsFactory = require(utilsFactoryObjectPath);

        var jsonPoster = jasmine.createSpyObj('JSONPoster',['postJSON']);
        utilsFactory.jsonPoster = jasmine.createSpy('utilsFactory.jsonPoster', ['postJSON']);
        utilsFactory.jsonPoster.andReturn(jsonPoster);

        var argv = []
        argv[2] = configPath;
        var fakeNativeProcess = { argv: argv }
        utilsFactory.nativeProcess = jasmine.createSpy('utilsFactory.nativeProcess');
        utilsFactory.nativeProcess.andReturn(fakeNativeProcess);

        require(runCQMClientScriptPath);

        expect(jsonPoster.postJSON).toHaveBeenCalledWith('systemTestHost', '/systemTestPath', 123987, expectedIstanbulJSON);
        expect(jsonPoster.postJSON).toHaveBeenCalledWith('systemTestHost', '/systemTestPath', 123987, expectedEclEmmaJSON);
    });
});