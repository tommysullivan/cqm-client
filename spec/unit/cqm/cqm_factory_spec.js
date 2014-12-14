var CQMFactory = require('../../../src/classes/cqm/cqm_factory.js');

describe('CQMFactory', function() {
    var fs,
        cheerio,
        cqmConfig,
        utilsFactory,
        configuration,
        commandLineOptions,
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
        ECLEmmaCoverageCSVParser,
        Collection,
        subject;

    beforeEach(function() {
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        cheerio = jasmine.createSpyObj('cheerio', ['load']);
        cqmConfig = {
            istanbulSectionHTMLSelector: 'istanbulSectionHTMLSelector'
        }
        utilsFactory = jasmine.createSpyObj('UtilsFactory',['json']);
        configuration = jasmine.createSpyObj('Configuration', ['host','port','path']);
        commandLineOptions = jasmine.createSpyObj('CommandLineOptions', ['requestedTags','requestedTags']);
        IstanbulCoverageReporterException = jasmine.createSpy('IstanbulCoverageReporterException');
        IstanbulCoverageReporter = jasmine.createSpy('IstanbulCoverageReporter');
        CoverageTotalsSectionWriter = jasmine.createSpy('CoverageTotalsSectionWriter');
        CoverageReportWriter = jasmine.createSpy('CoverageReportWriter');
        InvalidCoverageNumbersException = jasmine.createSpy('InvalidCoverageNumbersException');
        IstanbulCoverageSectionReporter = jasmine.createSpy('IstanbulCoverageSectionReporter');
        ECLEmmaClassCoverageReporter = jasmine.createSpy('ECLEmmaClassCoverageReporter');
        ECLEmmaGranularCoverageReporter = jasmine.createSpy('ECLEmmaGranularCoverageReporter');
        ECLEmmaCoverageReporter = jasmine.createSpy('ECLEmmaCoverageReporter');
        ECLEmmaCoverageCSVParser = jasmine.createSpy('ECLEmmaCoverageCSVParser');
        Collection = jasmine.createSpy('Collection');

        subject = CQMFactory(
            fs,
            cheerio,
            cqmConfig,
            utilsFactory,
            configuration,
            commandLineOptions,
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
            ECLEmmaCoverageCSVParser,
            Collection
        );
    });

    it('instances CQMFactory, which can be used to instantiate the CQM classes', function() {
        expect(subject).toBeDefined();
    });
});