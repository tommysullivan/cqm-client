module.exports = function(providedConfigurationOption) {
    return new Error("InvalidConfigurationOptionException. invalid option: " + providedConfigurationOption);
}