var fs = require('fs');

process.argv[2] = '-configPath';
process.argv[3] = 'spec/fixtures/configurations/dummy_system_test_config.json';

describe('Istanbul Coverage System Test', function() {
    it('should not throw any exceptions', function() {
        var jsonPoster = jasmine.createSpyObj('JSONPoster',['postJSON']);
        var expectedJSON = JSON.parse(fs.readFileSync('spec/fixtures/expected_outputs/istanbul_coverage_output.json'));
        var producedJSON;
        jsonPoster.postJSON.andCallFake(function(host,path,port,json) {
            producedJSON = json;
        });

        var utilsFactory = require('../../src/objects/utils_factory_object');
        utilsFactory.jsonPoster = jasmine.createSpy('utilsFactory.jsonPoster', ['postJSON']);
        utilsFactory.jsonPoster.andReturn(jsonPoster);

        require('../../src/scripts/run_cqm_client');
        expect(producedJSON).toEqual(expectedJSON);
    });
});