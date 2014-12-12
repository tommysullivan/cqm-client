describe('class: ECLEmmaGranularCoverageReporter', function() {
    var path = '../../../../src/classes/coverage/ecl_emma/ecl_emma_granular_coverage_reporter';
    var ECLEmmaGranularCoverageReporter;

    beforeEach(function() {
        ECLEmmaGranularCoverageReporter = require(path);
    });

    it('reads specific subset of metrics from a parsed JSON of class-level coverage metrics and writes them to a specific section named for that subset');

    it('is found at path '+path, function() {
        expect(ECLEmmaGranularCoverageReporter).not.toBeUndefined();
    });

    describe('constructor: ECLEmmaGranularCoverageReporter(coverageType, coveredPropName, notCoveredPropName)', function() {
        it('coverageType is the name of the specific subset of metrics that will show up in its own section in the written result');
        it('coveredPropName is the name of the property on the JSON that will be passed later which contains the covered metric for this specific coverageType');
        it('notCoveredPropName is the name of the property on the JSON that will be passed later which contains the not covered metric for this specific coverageType');
        var coverageType,
            coveredPropName,
            notCoveredPropName,
            subject;

        beforeEach(function() {
            coverageType = 'coverageType';
            coveredPropName = 'coveredPropName';
            notCoveredPropName = 'notCoveredPropName'
            subject = ECLEmmaGranularCoverageReporter(coverageType, coveredPropName, notCoveredPropName);
        });

        it('creates instances of ECLEmmaGranularCoverageReporter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('reportGranularCoverage(parsedClassCoverageResult, classCoverageReportWriter)', function() {
                var parsedClassCoverageResult, classCoverageReportWriter, coveredMetricValue, notCoveredMetricValue, granularCoverageTotalsWriter;
                beforeEach(function() {
                    coveredMetricValue = 'coveredMetricValue';
                    notCoveredMetricValue = 'notCoveredMetricValue'
                    parsedClassCoverageResult = {
                        coveredPropName: coveredMetricValue,
                        notCoveredPropName: notCoveredMetricValue
                    }
                    granularCoverageTotalsWriter = jasmine.createSpyObj('CoverageTotalsSectionWriter', ['writeCovered', 'writeNotCovered']);
                    classCoverageReportWriter = jasmine.createSpyObj('CoverageReportWriter', ['writeNewTotalsSection']);
                    classCoverageReportWriter.writeNewTotalsSection.andReturn(granularCoverageTotalsWriter);
                    subject.reportGranularCoverage(parsedClassCoverageResult, classCoverageReportWriter)
                });
                it('writes a new totals section within the classCoverageReportWriter titled with the value in construct param "coverageType"', function() {
                    expect(classCoverageReportWriter.writeNewTotalsSection).toHaveBeenCalledWith(coverageType);
                });
                describe('using the granularCoverageTotalsWriter returned by the writing of the new totals section', function() {
                    it('calls granularCoverageTotalsWriter.writeCovered() passing the value of the property whose name is in constructor param "coveredPropName" from the parsedClassCoverageResult JSON', function() {
                        expect(granularCoverageTotalsWriter.writeCovered).toHaveBeenCalledWith(coveredMetricValue);
                    });
                    it('calls granularCoverageTotalsWriter.writeNotCovered() passing the value of the property whose name is in constructor param "notCoveredPropName" from the parsedClassCoverageResult JSON', function() {
                        expect(granularCoverageTotalsWriter.writeNotCovered).toHaveBeenCalledWith(notCoveredMetricValue);
                    });
                });
            });
        });
    });
});