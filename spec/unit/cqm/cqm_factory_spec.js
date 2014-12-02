var CQMFactory = require('../../../src/classes/cqm/cqm_factory.js');

describe('CQMFactory', function() {
    var fs,
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
        subject;

    beforeEach(function() {
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        cheerio = jasmine.createSpyObj('cheerio', ['load']);
        cqmConfig = {
            istanbulSectionHTMLSelector: 'istanbulSectionHTMLSelector'
        }
        utilsFactory = jasmine.createSpyObj('UtilsFactory',['json']);
        configuration = jasmine.createSpyObj('Configuration', ['host','port','path']);
        IstanbulCoverageReporterException = jasmine.createSpy('IstanbulCoverageReporterException');
        IstanbulCoverageReporter = jasmine.createSpy('IstanbulCoverageReporter');
        CoverageTotalsSectionWriter = jasmine.createSpy('CoverageTotalsSectionWriter');
        CoverageReportWriter = jasmine.createSpy('CoverageReportWriter');
        InvalidCoverageNumbersException = jasmine.createSpy('InvalidCoverageNumbersException');
        IstanbulCoverageSectionReporter = jasmine.createSpy('IstanbulCoverageSectionReporter');
        subject = CQMFactory(
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
    });

    it('instances CQMFactory, which can be used to instantiate the CQM classes', function() {
        expect(subject).toBeDefined();
    });
});