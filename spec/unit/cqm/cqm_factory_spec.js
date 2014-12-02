var CQMFactory = require('../../../src/classes/cqm/cqm_factory.js');

describe('CQMFactory', function() {
    var fs,
        cheerio,
        cqmConfig,
        utilsFactory,
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