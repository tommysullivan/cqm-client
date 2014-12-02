var fs = require('fs'),
    cqmConfig = require('./cqm_config_object'),
    utilsFactory = require('./utils_factory_object'),
    Configuration = require('../classes/configuration/configuration'),
    InvalidCommandException = require('../classes/configuration/invalid_command_exception'),
    ConfigurationLoaderUsesFilePath = require('../classes/configuration/configuration_loader_uses_file_path'),
    ConfigurationLoaderBasedOnProcessArgs = require('../classes/configuration/configuration_loader_based_on_process_args'),
    ConfigurationForJobURLNotFoundException = require('../classes/configuration/configuration_for_job_url_not_found_exception'),
    ConfigurationLoaderUsesJobURL = require('../classes/configuration/configuration_loader_uses_job_url'),
    InvalidConfigurationOptionException = require('../classes/configuration/invalid_configuration_option_exception'),
    ConfigurationFactory = require('../classes/configuration/configuration_factory');

module.exports = ConfigurationFactory(
    fs,
    cqmConfig,
    utilsFactory,
    ConfigurationLoaderBasedOnProcessArgs,
    ConfigurationLoaderUsesJobURL,
    ConfigurationLoaderUsesFilePath,
    ConfigurationForJobURLNotFoundException,
    Configuration,
    InvalidCommandException,
    InvalidConfigurationOptionException
);