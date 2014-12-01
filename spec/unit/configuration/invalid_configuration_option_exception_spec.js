var InvalidConfigurationOptionException = require('../../../classes/configuration/invalid_configuration_option_exception');

describe('InvalidConfigurationOptionException', function() {
    describe('toString', function() {
        var subject, providedConfigurationOption;
        beforeEach(function() {
            providedConfigurationOption = 'providedConfigurationOption';
            subject = InvalidConfigurationOptionException(providedConfigurationOption);
        });
        it('outputs InvalidConfigurationOptionException', function() {
            expect(subject.toString()).toContain('InvalidConfigurationOptionException');
        });
        it('outputs the providedConfigurationOption', function() {
            expect(subject.toString()).toContain(providedConfigurationOption);
        });
    });
});