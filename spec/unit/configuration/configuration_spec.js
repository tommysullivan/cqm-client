var Configuration = require('../../../classes/configuration/configuration');

describe('Configuration', function() {
    it('is instantiable', function() {
        var configurationJSON = {}
        expect(Configuration(configurationJSON)).not.toBe(undefined);
    });
});