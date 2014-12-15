var fs = require('fs');
var fixturesPath = 'spec/fixtures/';
var expectedOutputPath = fixturesPath+'expected_outputs/';

var configPath = fixturesPath+'inputs/configurations/dummy_system_test_config.json';
var istanbulExpectedResultPath = expectedOutputPath+'istanbul_coverage_output.json';
var eclEmmaExpectedResultPath =  expectedOutputPath+'ecl_emma_coverage_output.json';
var simplecovExpectedResultPath = expectedOutputPath+'simplecov_coverage_output.json';
var utilsFactoryObjectPath = '../../src/objects/utils_factory_object';
var runCQMClientScriptPath = '../../src/scripts/run_cqm_client';

describe('CQM System Test', function() {
    it('calls the cqm client script located at '+runCQMClientScriptPath);
    describe('faking the command line arguments', function() {
        it('to use configuration located at '+configPath);
        it('and to run jobs tagged as "systemTest"');
    });
    it('intercepts would-be HTTP posts of result content and verifies it matches the expected JSON located in '+expectedOutputPath, function() {

        function getExpectedJSON(path) {
            return JSON.parse(fs.readFileSync(path));
        }
        var expectedIstanbulJSON = getExpectedJSON(istanbulExpectedResultPath);
        var expectedEclEmmaJSON = getExpectedJSON(eclEmmaExpectedResultPath);
        var expectedSimpleCovJSON = getExpectedJSON(simplecovExpectedResultPath);

        var utilsFactory = require(utilsFactoryObjectPath);

        var jsonPoster = jasmine.createSpyObj('JSONPoster',['postJSON']);
        //jsonPoster.postJSON.andCallFake(function(a,b,c,d) { console.log(JSON.stringify(d)); });
        utilsFactory.jsonPoster = jasmine.createSpy('utilsFactory.jsonPoster', ['postJSON']);
        utilsFactory.jsonPoster.andReturn(jsonPoster);

        var argv = []
        argv[2] = configPath;
        var fakeNativeProcess = { argv: argv }
        utilsFactory.nativeProcess = jasmine.createSpy('utilsFactory.nativeProcess');
        utilsFactory.nativeProcess.andReturn(fakeNativeProcess);

        require(runCQMClientScriptPath);

        expect(jsonPoster.postJSON).toHaveBeenCalledWith('systemTestHost', '/systemTestPath', 123987, expectedIstanbulJSON);
        expect(jsonPoster.postJSON).toHaveBeenCalledWith('systemTestHost', '/systemTestPath', 123987, expectedIstanbulJSON);
        expect(jsonPoster.postJSON).toHaveBeenCalledWith('systemTestHost', '/systemTestPath', 123987, expectedSimpleCovJSON);
    });
});