process.argv[2] = '-jobURL';
process.argv[3] = 'fakeConfigPath';

describe('Istanbul Coverage System Test', function() {
    it('should not throw any exceptions', function() {
        //TODO: Test that the results are actually what we want here.
        require('../../src/scripts/run_cqm_client');
    });
});