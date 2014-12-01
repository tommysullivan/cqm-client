var CoverageReportWriter = require('../../../src/classes/coverage/coverage_report_writer');

describe('CoverageReportWriter(coverageJSONObject, factory)', function() {
    var subject, coverageJSONObject, factory;
    beforeEach(function() {
        coverageJSONObject = {}
        factory = jasmine.createSpyObj('Factory', ['coverageTotalsSectionWriter']);
        subject = CoverageReportWriter(coverageJSONObject, factory);
    });

    it('creates instances of CoverageReportWriter that provide an API for writing to coverageJSONObject POJO', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('writeNewTotalsSection(sectionName)', function() {
        var sectionName, coverageTotalsSectionWriter, expectedCoverageTotalsSectionWriter;
        beforeEach(function() {
            expectedCoverageTotalsSectionWriter = {}
            factory.coverageTotalsSectionWriter.andReturn(expectedCoverageTotalsSectionWriter);
            sectionName = 'sectionName';
            coverageTotalsSectionWriter = subject.writeNewTotalsSection(sectionName);
        });
        describe('when there is no summary object in the coverageJSONObject', function() {
            it('creates a new summary object within the coverageJSONObject', function() {
                expect(coverageJSONObject.summary).toBeDefined();
            });
        });
        it('creates a new section object within the summary object with the name passed to sectionName', function() {
            expect(coverageJSONObject.summary[sectionName]).toBeDefined();
        });
        it('calls the factory to create a new CoverageTotalsSectionWriter for the newly created section object', function() {
            expect(factory.coverageTotalsSectionWriter).toHaveBeenCalledWith(coverageJSONObject.summary[sectionName]);
        });
        it('returns the newly created CoverageTotalsSectionWriter to the caller', function() {
            expect(coverageTotalsSectionWriter).toBe(expectedCoverageTotalsSectionWriter);
        });
    });

    describe('writeCoverageDetails(coverageDetails)', function() {
        it('creates a new property on coverageJSONObject called details and sets the value to coverageDetails', function() {
            var coverageDetails = 'coverageDetails';
            subject.writeCoverageDetails(coverageDetails);
            expect(coverageJSONObject.details).toEqual(coverageDetails);
        });
    });
});