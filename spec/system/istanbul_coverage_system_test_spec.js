process.argv[2] = '-configPath';
process.argv[3] = 'spec/fixtures/configurations/dummy_system_test_config.json';

describe('Istanbul Coverage System Test', function() {
    it('should not throw any exceptions', function() {
        //TODO: Test that the results are actually what we want here.
        require('../../src/scripts/run_cqm_client');
    });
});