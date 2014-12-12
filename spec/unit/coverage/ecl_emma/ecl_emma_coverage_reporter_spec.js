describe('class: ECLEmmaCoverageReporter', function() {
    var path = '../../../../src/classes/coverage/ecl_emma/ecl_emma_coverage_reporter';
    var ECLEmmaCoverageReporter;

    beforeEach(function() {
        ECLEmmaCoverageReporter = require(path);
    });

    it('reads ecl emma coverage reports and then writes the results to a CoverageReportWriter');

    it('is found at path '+path, function() {
        expect(ECLEmmaCoverageReporter).not.toBeUndefined();
    });

    describe('constructor: ECLEmmaCoverageReporter()', function() {
        var subject;

        beforeEach(function() {
            subject = ECLEmmaCoverageReporter();
        });

        it('creates instances of ECLEmmaCoverageReporter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {

        });
    });
});