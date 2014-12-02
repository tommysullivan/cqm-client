var fs = require('fs'),
    cheerio = require('cheerio'),
    cqmConfig = require('./cqm_config_object'),
    utilsFactory = require('./utils_factory_object'),
    IstanbulCoverageReporterException = require('../classes/coverage/istanbul_coverage_reporter_exception'),
    IstanbulCoverageReporter = require('../classes/coverage/istanbul_coverage_reporter'),
    CoverageTotalsSectionWriter = require('../classes/coverage/coverage_totals_section_writer'),
    CoverageReportWriter = require('../classes/coverage/coverage_report_writer'),
    InvalidCoverageNumbersException = require('../classes/coverage/invalid_coverage_numbers_exception'),
    CQMClient = require('../classes/cqm/cqm_client'),
    ReportSender = require('../classes/cqm/report_sender'),
    IstanbulCoverageSectionReporter = require('../classes/coverage/istanbul_coverage_section_reporter'),
    CQMFactory = require('../classes/cqm/cqm_factory');

var configurationFactory = require('../objects/configuration_factory_object');
var configurationLoader = configurationFactory.configurationLoader();
var configuration = configurationLoader.loadConfiguration();

module.exports = CQMFactory(
    fs,
    cheerio,
    cqmConfig,
    utilsFactory,
    configuration,
    IstanbulCoverageReporterException,
    IstanbulCoverageReporter,
    CoverageTotalsSectionWriter,
    CoverageReportWriter,
    InvalidCoverageNumbersException,
    CQMClient,
    ReportSender,
    IstanbulCoverageSectionReporter
);