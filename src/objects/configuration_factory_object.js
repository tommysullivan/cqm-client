var fs = require('fs'),
    utilsFactory = require('./utils_factory_object'),
    Configuration = require('../classes/configuration/configuration'),
    InvalidCommandException = require('../classes/configuration/invalid_command_exception'),
    InvalidConfigurationOptionException = require('../classes/configuration/invalid_configuration_option_exception'),
    CommandLineOptions = require('../classes/configuration/command_line_options'),
    JobConfiguration = require('../classes/configuration/job_configuration'),
    ConfigurationFactory = require('../classes/configuration/configuration_factory');

module.exports = ConfigurationFactory(
    fs,
    utilsFactory,
    Configuration,
    InvalidCommandException,
    InvalidConfigurationOptionException,
    CommandLineOptions,
    JobConfiguration
);