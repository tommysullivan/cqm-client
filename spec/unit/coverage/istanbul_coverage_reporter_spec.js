var IstanbulCoverageReporter = require('../../../src/classes/coverage/istanbul_coverage_reporter');

describe('IstanbulCoverageReporter', function() {
    var jsonFileLoader,
        cheerio,
        fs,
        factory,
        indexHTMLPath,
        coverageJSONPath,
        jqueryResult,
        coverageReportWriter,
        coverageTotalsSectionWriter,
        istanbulCoverageReporterException,
        indexHTMLContent,
        istanbulCoverageSectionReporter,
        sectionHTMLSelector,
        subject;

    beforeEach(function() {
        jsonFileLoader = jasmine.createSpyObj('JSONFileLoader', ['loadJSONFile']);
        cheerio = jasmine.createSpyObj('cheerio', ['load']);
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        factory = jasmine.createSpyObj('CQMFactory', ['istanbulCoverageReporterException']);
        indexHTMLPath = 'indexHTMLPath';
        coverageJSONPath = 'coverageJSONPath';
        istanbulCoverageReporterException = {}
        jqueryResult = jasmine.createSpyObj('JQueryResult',['each']);
        factory.istanbulCoverageReporterException.andReturn(istanbulCoverageReporterException);
        $ = jasmine.createSpy('$');
        $.andReturn(jqueryResult);
        cheerio.load.andReturn($);
        coverageReportWriter = jasmine.createSpyObj('CoverageReportWriter',['writeCoverageDetails', 'writeNewTotalsSection']);
        coverageTotalsSectionWriter = jasmine.createSpyObj('CoverageTotalsSectionWriter', ['writeCovered','writeTotal']);
        coverageReportWriter.writeNewTotalsSection.andReturn(coverageTotalsSectionWriter);
        indexHTMLContent = 'indexHTMLContent';
        fs.readFileSync.andReturn(indexHTMLContent);
        sectionHTMLSelector = '.metric';
        istanbulCoverageSectionReporter = jasmine.createSpyObj('IstanbulCoverageSectionReporter', ['reportCoverageSectionTotals']);

        subject = IstanbulCoverageReporter(
            jsonFileLoader,
            cheerio,
            fs,
            factory,
            indexHTMLPath,
            coverageJSONPath,
            sectionHTMLSelector,
            istanbulCoverageSectionReporter
        );
    });

    it('creates instances of IstanbulCoverageReporter which turn istanbul HTML & JSON results into CQM coverage report', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('reportCoverage(coverageReportWriter)', function() {

        it('uses fs to read the istanbul html coverage results file located at indexHTMLPath', function() {
            subject.reportCoverage(coverageReportWriter);
            expect(fs.readFileSync).toHaveBeenCalledWith(indexHTMLPath);
        });

        it('uses cheerio to create a server-side jquery object with the retrieved html', function() {
            subject.reportCoverage(coverageReportWriter);
            expect(cheerio.load).toHaveBeenCalledWith(indexHTMLContent);
        });

        it('uses jsonFileLoader to load and parse the istanbul json results file located at coverageJSONPath', function() {
            subject.reportCoverage(coverageReportWriter);
            expect(jsonFileLoader.loadJSONFile).toHaveBeenCalledWith(coverageJSONPath);
        });

        it('uses sectionHTMLSelector jquery selector to find the DOM elements containing the totals', function() {
            subject.reportCoverage(coverageReportWriter);
            expect($).toHaveBeenCalledWith(sectionHTMLSelector);
        });

        it('uses the jquery *each* method to loop over each matching "totals DOM element" it finds', function() {
            subject.reportCoverage(coverageReportWriter);
            expect(jqueryResult.each).toHaveBeenCalled();
        });

        it('uses the coverageReportWriter to writeCoverageDetails, passing the raw istanbul JSON result loaded from coverageJSONPath', function() {
            var rawIstanbulJSON = {}
            jsonFileLoader.loadJSONFile.andReturn(rawIstanbulJSON);
            subject.reportCoverage(coverageReportWriter);
            expect(coverageReportWriter.writeCoverageDetails).toHaveBeenCalledWith(rawIstanbulJSON);
        });

        describe('for each matching DOM element found', function() {
            it('calls istanbulCoverageSectionReporter.reportCoverageSectionTotals(sectionJQueryResult, index, coverageReportWriter)', function() {
                var sectionJQueryResult = {}
                var index = 3;
                var eachHandler;
                jqueryResult.each.andCallFake(function(currentEachHandler) {
                    eachHandler = currentEachHandler;
                });
                subject.reportCoverage(coverageReportWriter);
                eachHandler(sectionJQueryResult, index);
                expect(istanbulCoverageSectionReporter.reportCoverageSectionTotals).toHaveBeenCalledWith(index, sectionJQueryResult, coverageReportWriter);
            });
        });

        describe('when an exception is thrown', function() {
            var originalException, istanbulCoverageReporterException;

            beforeEach(function() {
                originalException = {}
                istanbulCoverageReporterException = {}
                factory.istanbulCoverageReporterException.andReturn(istanbulCoverageReporterException);
            });

            function expectExceptionBehavior() {
                it('calls the factory to create a new IstanbulCoverageReporterException', function() {
                    expect(function() { subject.reportCoverage(coverageReportWriter); }).toThrow();
                    expect(factory.istanbulCoverageReporterException).toHaveBeenCalled();
                });
                it('passes indexHTMLPath, coverageJSONPath, and the original exception, e', function() {
                    expect(function() { subject.reportCoverage(coverageReportWriter); }).toThrow();
                    expect(factory.istanbulCoverageReporterException).toHaveBeenCalledWith(indexHTMLPath, coverageJSONPath, originalException);
                });
                it('throws the resulting exception', function() {
                    expect(function() { subject.reportCoverage(coverageReportWriter); }).toThrow(istanbulCoverageReporterException);
                });
            }

            describe('by fs.readFileSync', function() {
                beforeEach(function() {
                    fs.readFileSync.andThrow(originalException);
                });
                expectExceptionBehavior();
            });
            describe('by cheerio.load', function() {
                beforeEach(function() {
                    cheerio.load.andThrow(originalException);
                });
                expectExceptionBehavior();
            });
            describe('by jsonFileLoader.loadJSONFile', function() {
                beforeEach(function() {
                    jsonFileLoader.loadJSONFile.andThrow(originalException);
                });
                expectExceptionBehavior();
            });
        });
    });
});