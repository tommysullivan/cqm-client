module.exports = function(providedConfigurationOption) {
    return {
        toString: function() {
            return "InvalidConfigurationOptionException. invalid option: " + providedConfigurationOption;
        }
    }
}