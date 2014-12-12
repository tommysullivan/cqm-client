var fs = require('fs');
var configPath = 'spec/fixtures/inputs/configurations/dummy_system_test_config.json';
var expectedResultPath = 'spec/fixtures/expected_outputs/istanbul_coverage_output.json';
var utilsFactoryObjectPath = '../../src/objects/utils_factory_object';
var runCQMClientScriptPath = '../../src/scripts/run_cqm_client';
process.argv[2] = '-configPath';
process.argv[3] = configPath;

describe('Istanbul Coverage System Test', function() {
    describe('fakes out the command line arguments by overriding process.argv', function() {
        it('the first faked arg is -configPath');
        it('the second faked arg is the path to the config: '+configPath);
    });
    describe('it sets up conditions to intercept the http calls that would otherwise go to elasticsearch', function() {
        it('creates a fake JSONPoster that will intercept http posts that would otherwise go to elasticsearch');
        it('requires the utils_factory_object at '+utilsFactoryObjectPath);
        it('replaces the jsonPoster method in the utilsFactory to return the fake');
    });
    it('loads and parses the expected result output from '+expectedResultPath);
    it('executes the cqmClient via require of '+runCQMClientScriptPath);
    it('checks to see if the intercepted http payload matches the expects result', function() {
        var jsonPoster = jasmine.createSpyObj('JSONPoster',['postJSON']);
        var expectedJSON = JSON.parse(fs.readFileSync(expectedResultPath));
        var producedJSON;
        jsonPoster.postJSON.andCallFake(function (host, path, port, json) {
            producedJSON = json;
        });
        var utilsFactory = require(utilsFactoryObjectPath);
        utilsFactory.jsonPoster = jasmine.createSpy('utilsFactory.jsonPoster', ['postJSON']);
        utilsFactory.jsonPoster.andReturn(jsonPoster);

        require(runCQMClientScriptPath);
        expect(producedJSON).toEqual(expectedJSON);
    });
});