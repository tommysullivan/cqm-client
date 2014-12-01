var IstanbulCoverageSectionReporter = require('../../../src/classes/coverage/istanbul_coverage_section_reporter');

describe('IstanbulCoverageSectionReporter($, sectionNamesOrderedByAppearance)', function() {
    var subject, sectionNamesOrderedByAppearance, $, jqueryObject, covered, total;

    beforeEach(function() {
        covered = 17
        total = 23;
        sectionNamesOrderedByAppearance = ['statements','branches','functions','lines'];
        $ = jasmine.createSpy('$');
        sectionJQueryResult = jasmine.createSpyObj('JQueryObject',['text']);
        sectionJQueryResult.text.andReturn(' some text  ('+covered+'    '+total+') some other text');
        $.andReturn(sectionJQueryResult);
        subject = IstanbulCoverageSectionReporter($, sectionNamesOrderedByAppearance);
    });

    it('creates instances of IstanbulCoverageSectionReporter which finds metrics in istanbul HTML and writes them to the coverageReportWriter', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('reportCoverageSectionTotals(matchingDOMElement, index, coverageReportWriter)', function() {
        var matchingDOMElement, index, coverageReportWriter, coverageTotalsSectionWriter;
        beforeEach(function() {
            matchingDOMElement = {}
            coverageReportWriter = jasmine.createSpyObj('CoverageReportWriter', ['writeNewTotalsSection']);
            coverageTotalsSectionWriter = jasmine.createSpyObj('CoverageTotalsSectionWriter', ['writeCovered','writeTotal']);
            coverageReportWriter.writeNewTotalsSection.andReturn(coverageTotalsSectionWriter);
        });
        describe('when the index is past the 4th column', function() {
            beforeEach(function() {
                index = 4;
            });
            it('ignores the column and returns immediately', function() {
                subject.reportCoverageSectionTotals(matchingDOMElement, index, coverageReportWriter);
                expect($).not.toHaveBeenCalled();
            });
        });
        describe('when the index is one of the first three columns', function() {
            beforeEach(function() {
                index = 2;
                subject.reportCoverageSectionTotals(matchingDOMElement, index, coverageReportWriter);
            });
            it('wraps the matching element with jquery using $(matchingDOMElement)', function() {
                expect($).toHaveBeenCalledWith(matchingDOMElement);
            });
            it('gets all the text within the DOM element and its children as a string without any markup', function() {
                expect(sectionJQueryResult.text).toHaveBeenCalled();
            });
            it('uses the coverageReportWriter to create a new totals section with the sectionName, thus obtaining a section writer for that new section', function() {
                expect(coverageReportWriter.writeNewTotalsSection).toHaveBeenCalledWith(sectionNamesOrderedByAppearance[index]);
            });
            it('uses the new section writer to write the covered amount', function() {
                expect(coverageTotalsSectionWriter.writeCovered).toHaveBeenCalledWith(covered);
            });
            it('uses the new section writer to write the total amount', function() {
                expect(coverageTotalsSectionWriter.writeTotal).toHaveBeenCalledWith(total);
            });
        });
    });
});