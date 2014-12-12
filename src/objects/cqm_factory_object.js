var fs = require('fs'),
    cheerio = require('cheerio'),
    cqmConfig = require('./cqm_config_object'),
    utilsFactory = require('./utils_factory_object'),
    IstanbulCoverageReporterException = require('../classes/coverage/istanbul/istanbul_coverage_reporter_exception'),
    IstanbulCoverageReporter = require('../classes/coverage/istanbul/istanbul_coverage_reporter'),
    CoverageTotalsSectionWriter = require('../classes/coverage/general/coverage_totals_section_writer'),
    CoverageReportWriter = require('../classes/coverage/general/coverage_report_writer'),
    InvalidCoverageNumbersException = require('../classes/coverage/general/invalid_coverage_numbers_exception'),
    CQMClient = require('../classes/cqm/cqm_client'),
    ReportSender = require('../classes/cqm/report_sender'),
    IstanbulCoverageSectionReporter = require('../classes/coverage/istanbul/istanbul_coverage_section_reporter'),
    CQMFactory = require('../classes/cqm/cqm_factory');
    ECLEmmaClassCoverageReporter = require('../classes/coverage/ecl_emma/ecl_emma_class_coverage_reporter');
    ECLEmmaGranularCoverageReporter = require('../classes/coverage/ecl_emma/ecl_emma_granular_coverage_reporter');
    ECLEmmaCoverageReporter = require('../classes/coverage/ecl_emma/ecl_emma_coverage_reporter');
    ECLEmmaCoverageCSVParser = require('../classes/coverage/ecl_emma/ecl_emma_coverage_csv_parser');

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
    IstanbulCoverageSectionReporter,
    ECLEmmaClassCoverageReporter,
    ECLEmmaGranularCoverageReporter,
    ECLEmmaCoverageReporter,
    ECLEmmaCoverageCSVParser
);