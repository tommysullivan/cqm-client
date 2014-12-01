var fs = require('fs');
var Configuration = require('../classes/configuration');
var ConfigurationLoaderUsesFiles = require('../classes/configuration_loader_uses_files');
var ConfigurationLoaderUsesJobURL = require('../classes/configuration_loader_uses_job_url');
var CausedError = require('../classes/caused_error');
var Process = require('../classes/process')
var Factory = require('../classes/factory');

var jobURLToConfigFilePathMapFilePath = 'configurations/configuration_files_keyed_by_job_url.json';

var factory = Factory(
    fs,
    Configuration,
    InvalidCommandException,
    ConfigurationLoaderUsesFiles,
    ConfigurationLoaderUsesJobURL,
    jobURLToConfigFilePathMapFilePath,
    process,
    factory,
    InvalidConfigurationOptionException,
    CausedException
);

var configurationLoader = factory.configurationLoader();
var cqmClient = factory.cqmClient(configurationLoader.loadConfiguration());
cqmClient.reportMetricsToServer();