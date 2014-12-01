var Factory = require('../classes/cqm/factory'),
    fs = require('fs'),
    http = require('http'),
    nativeProcess = process,
    cheerio = require('cheerio'),
    jobURLToConfigFilePathMapFilePath = 'configurations/configuration_files_keyed_by_job_url.json',
    Configuration = require('../classes/configuration/configuration'),
    InvalidCommandException = require('../classes/configuration/invalid_command_exception'),
    ConfigurationLoaderUsesFilePath = require('../classes/configuration/configuration_loader_uses_file_path'),
    ConfigurationLoaderUsesJobURL = require('../classes/configuration/configuration_loader_uses_job_url'),
    Process = require('../classes/utils/process'),
    InvalidConfigurationOptionException = require('../classes/configuration/invalid_configuration_option_exception'),
    ConfigurationLoaderBasedOnProcessArgs = require('../classes/configuration/configuration_loader_based_on_process_args'),
    ConfigurationForJobURLNotFoundException = require('../classes/configuration/configuration_for_job_url_not_found_exception'),
    JSON = JSON,
    UndefinedProcessArgumentException = require('../classes/utils/undefined_process_argument_exception'),
    JSONFileLoaderException = require('../classes/utils/json_file_loader_exception'),
    IstanbulCoverageReporterException = require('../classes/coverage/istanbul_coverage_reporter_exception'),
    IstanbulCoverageReporter = require('../classes/coverage/istanbul_coverage_reporter'),
    JSONFileLoader = require('../classes/utils/json_file_loader'),
    CoverageTotalsSectionWriter = require('../classes/coverage/coverage_totals_section_writer'),
    CoverageReportWriter = require('../classes/coverage/coverage_report_writer'),
    InvalidCoverageNumbersException = require('../classes/coverage/invalid_coverage_numbers_exception'),
    CQMClient = require('../classes/cqm/cqm_client'),
    ReportSender = require('../classes/communication/report_sender'),
    JSONPoster = require('../classes/communication/json_poster');

module.exports = Factory(
    fs,
    http,
    nativeProcess,
    cheerio,
    jobURLToConfigFilePathMapFilePath,
    Configuration,
    InvalidCommandException,
    ConfigurationLoaderUsesFilePath,
    ConfigurationLoaderUsesJobURL,
    Process,
    InvalidConfigurationOptionException,
    ConfigurationLoaderBasedOnProcessArgs,
    ConfigurationForJobURLNotFoundException,
    JSON,
    UndefinedProcessArgumentException,
    JSONFileLoaderException,
    IstanbulCoverageReporterException,
    IstanbulCoverageReporter,
    JSONFileLoader,
    CoverageTotalsSectionWriter,
    CoverageReportWriter,
    InvalidCoverageNumbersException,
    CQMClient,
    ReportSender,
    JSONPoster
);