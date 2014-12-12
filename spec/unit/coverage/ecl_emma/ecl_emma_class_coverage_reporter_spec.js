describe('class: ECLEmmaClassCoverageReporter', function() {
    var path = '../../../../src/classes/coverage/ecl_emma/ecl_emma_class_coverage_reporter';
    var ECLEmmaClassCoverageReporter;

    beforeEach(function() {
        ECLEmmaClassCoverageReporter = require(path);
    });

    it('reads from a pre-parsed JSON containing class-level metrics and works with collaborating objects to write those results out');

    it('is found at path '+path, function() {
        expect(ECLEmmaClassCoverageReporter).not.toBeUndefined();
    });

    describe('constructor: ECLEmmaClassCoverageReporter(granularCoverageReporters)', function() {
        it('expects an array of ECLEmmaGranularCoverageReporter instances which it leverages to write more granular class metrics');

        var granularCoverageReporters,
            granularCoverageReporter1,
            granularCoverageReporter2,
            subject;

        beforeEach(function() {
            granularCoverageReporter1 = jasmine.createSpyObj('ECLEmmaGranularCoverageReporter 1', ['reportGranularCoverage']);
            granularCoverageReporter2 = jasmine.createSpyObj('ECLEmmaGranularCoverageReporter 2', ['reportGranularCoverage']);
            granularCoverageReporters = [granularCoverageReporter1, granularCoverageReporter2]
            subject = ECLEmmaClassCoverageReporter(granularCoverageReporters);
        });

        it('creates instances of ECLEmmaClassCoverageReporter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('reportClassCoverages(parsedClassCoverageResult, classesGroupCoverageReportWriter)', function() {
                var parsedClassCoverageResult, classesGroupCoverageReportWriter, classCoverageReportWriter, fqn;
                beforeEach(function() {
                    fqn = 'fqn';
                    parsedClassCoverageResult = {
                        fqn: fqn
                    }
                    classesGroupCoverageReportWriter = jasmine.createSpyObj('classesGroupCoverageReportWriter', ['writeNewGroupingSection']);
                    classCoverageReportWriter = jasmine.createSpyObj('classCoverageReportWriter',['reportGranularCoverage']);
                    classesGroupCoverageReportWriter.writeNewGroupingSection.andReturn(classCoverageReportWriter);
                    subject.reportClassCoverages(parsedClassCoverageResult, classesGroupCoverageReportWriter)
                });
                it('creates a new section in the classesGroupCoverageReportWriter specific to the fqn of the current class described by parsedClassCoverageResult', function() {
                    expect(classesGroupCoverageReportWriter.writeNewGroupingSection).toHaveBeenCalledWith(fqn);
                });
                describe('for each of the granularCoverageReporters with which it is constructed', function() {
                    it('calls granularCoverageReporter.reportGranularCoverage(parsedClassCoverageResult, classCoverageReportWriter)', function() {
                        expect(granularCoverageReporter1.reportGranularCoverage).toHaveBeenCalledWith(parsedClassCoverageResult, classCoverageReportWriter);
                        expect(granularCoverageReporter2.reportGranularCoverage).toHaveBeenCalledWith(parsedClassCoverageResult, classCoverageReportWriter);
                    });
                });
            });
        });
    });
});