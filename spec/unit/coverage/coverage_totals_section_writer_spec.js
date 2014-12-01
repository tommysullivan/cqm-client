var CoverageTotalsSectionWriter = require('../../../src/classes/coverage/coverage_totals_section_writer');

describe('CoverageTotalsSectionWriter(sectionJSONObject)', function() {
    var subject, sectionJSON, factory, exception;
    beforeEach(function () {
        sectionJSON = {}
        exception = {}
        factory = jasmine.createSpyObj('Factory',['invalidCoverageNumbersException']);
        factory.invalidCoverageNumbersException.andReturn(exception);
        subject = CoverageTotalsSectionWriter(sectionJSON, factory);
    });

    it('creates instances of CoverageTotalsSectionWriter which allow writing of coverage metrics to a particular sectionJSONObject', function() {
        expect(subject).toBeDefined();
    });

    describe('writeCovered(covered)', function() {
        var total, covered, notCovered;
        describe('when total has already been written', function() {
            beforeEach(function() {
                total = 10;
                covered = 2;
                subject.writeTotal(total);
                subject.writeCovered(covered);
            });
            it('sets covered, notCovered, and percent on sectionJSONObject', function() {
                expect(sectionJSON.covered).toBe(covered);
                expect(sectionJSON.notCovered).toBe(total-covered);
                expect(sectionJSON.percent).toBe(covered / total);
                expect(sectionJSON.total).toBe(total);
            });
        });
        describe('when total is set to zero', function() {
            beforeEach(function() {
                total = 0;
                subject.writeTotal(total);
            });
            describe('and covered is zero', function() {
                it('sets everything to zero', function() {
                    subject.writeCovered(0);
                    expect(sectionJSON.covered).toBe(0);
                    expect(sectionJSON.notCovered).toBe(0);
                    expect(sectionJSON.percent).toBe(0);
                    expect(sectionJSON.total).toBe(0);
                });
            });
            describe('and covered is non-zero', function() {
                it('throws an exception', function() {
                    var covered = 5;
                    expect(function() { subject.writeCovered(covered); }).toThrow(exception);
                    expect(factory.invalidCoverageNumbersException).toHaveBeenCalledWith(total, covered, -5);
                });
            });
        });
        describe('when total has not been assigned but notCovered has been', function() {
            beforeEach(function() {
                notCovered = 8;
                covered = 2;
                total = 10;
                subject.writeNotCovered(notCovered);
                subject.writeCovered(covered);
            });
            it('sets covered, total, and percent on sectionJSONObject', function() {
                expect(sectionJSON.covered).toBe(covered);
                expect(sectionJSON.notCovered).toBe(total-covered);
                expect(sectionJSON.percent).toBe(covered / total);
                expect(sectionJSON.total).toBe(total);
            });
        });
        describe('when total and notCovered have not been assigned', function() {
            it('sets only covered', function() {
                covered = 7;
                subject.writeCovered(covered);
                expect(sectionJSON.covered).toBe(covered);
                expect(sectionJSON.notCovered).toBeUndefined();
                expect(sectionJSON.percent).toBeUndefined();
                expect(sectionJSON.total).toBeUndefined();
            });
        });
    });
    describe('writeNotCovered(notCovered)', function() {
        describe('when total is already set', function() {
            it('sets covered and percent', function() {});
        });
        describe('when covered is already set', function() {
            it('sets total and percent', function() {});
        });
        describe('when total and covered are not set', function() {
            it('sets only notCovered', function() { });
        })
    });
    describe('writeTotal(total)', function() {
        describe('when covered is already set', function() {
            it('sets notCovered and percent', function() {});
        });
        describe('when notCovered is already set', function() {
            it('sets covered and percent', function() {});
        });
        describe('when notCovered and covered are not set', function() {
            it('sets only total', function() {});
        })
    });
});
