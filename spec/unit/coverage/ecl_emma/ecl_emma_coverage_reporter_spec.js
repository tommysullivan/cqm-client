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

    describe('constructor: ECLEmmaCoverageReporter(fs, coverageCSVFilePath, eclEmmaCoverageCSVParser, eclEmmaClassCoverageReporter, summarySectionName, classesSectionName)', function() {
        it('uses fs to read in the CSV file');
        it('expects to find the ECL Emma coverage CSV file at coverageCSVFilePath');
        it('uses eclEmmaCoverageCSVParser to help with parsing the CSV');
        it('uses eclEmmaClassCoverageReporter to help with reporting coverage metrics at the class level');
        it('creates a section for the summary metrics information using the section title supplied in summarySectionName');
        it('creates a section for the class-level metrics information using the section title supplied in classesSectionName');

        var fs,
            coverageCSVFilePath,
            eclEmmaCoverageCSVParser,
            eclEmmaClassCoverageReporter,
            summarySectionName,
            classesSectionName,
            csvFileContent,
            parsedClassCoverageResults,
            classResult1,
            classResult2,
            subject;

        beforeEach(function() {
            summarySectionName = 'summarySectionName';
            classesSectionName = 'classesSectionName';
            csvFileContent = 'csvFileContent';
            coverageCSVFilePath = 'coverageCSVFilePath';
            fs = jasmine.createSpyObj('fs', ['readFileSync']);
            fs.readFileSync.andReturn(csvFileContent);
            classResult1 = {}
            classResult2 = {}
            parsedClassCoverageResults = [classResult1, classResult2];
            eclEmmaCoverageCSVParser = jasmine.createSpyObj('ECLEmmaCoverageCSVParser', ['parseCSVIntoClassCoverageResults']);
            eclEmmaCoverageCSVParser.parseCSVIntoClassCoverageResults.andReturn(parsedClassCoverageResults);
            eclEmmaClassCoverageReporter = jasmine.createSpyObj('ECLEmmaClassCoverageReporter', ['reportClassCoverages']);
            subject = ECLEmmaCoverageReporter(fs,
                coverageCSVFilePath,
                eclEmmaCoverageCSVParser,
                eclEmmaClassCoverageReporter,
                summarySectionName,
                classesSectionName
            );
        });

        it('creates instances of ECLEmmaCoverageReporter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('reportCoverage(coverageReportWriter)', function() {
                var coverageReportWriter, summaryGroupCoverageReportWriter,classesGroupCoverageReportWriter;
                beforeEach(function() {
                    coverageReportWriter = jasmine.createSpyObj('CoverageReportWriter', ['writeNewGroupingSection','writeOriginalCoverageData'])
                    summaryGroupCoverageReportWriter = {}
                    classesGroupCoverageReportWriter = {}
                    coverageReportWriter.writeNewGroupingSection.andCallFake(function(sectionName) {
                        if(sectionName==summarySectionName) return summaryGroupCoverageReportWriter;
                        if(sectionName==classesSectionName) return classesGroupCoverageReportWriter;
                        throw new Error('test error');
                    });
                    subject.reportCoverage(coverageReportWriter);
                });
                it('reads the CSV file from the supplied coverageCSVFilePath', function() {
                    expect(fs.readFileSync).toHaveBeenCalledWith(coverageCSVFilePath);
                });
                it('asks the eclEmmaCoverageCSVParser to parseCSVIntoClassCoverageResults passing the loaded CSV file string', function() {
                    expect(eclEmmaCoverageCSVParser.parseCSVIntoClassCoverageResults).toHaveBeenCalledWith(csvFileContent);
                });
                it('writes a new section for overall metrics summary whose name is the value in summarySectionName', function() {
                    expect(coverageReportWriter.writeNewGroupingSection).toHaveBeenCalledWith(summarySectionName);
                });
                describe('for each parsed class result (row in the CSV file that contains coverage metrics converted to a JSON)', function() {
                    it('we ask eclEmmaClassCoverageReporter to report coverage to the classesReportWriter', function() {
                        expect(eclEmmaClassCoverageReporter.reportClassCoverages).toHaveBeenCalledWith(classResult1, classesGroupCoverageReportWriter);
                        expect(eclEmmaClassCoverageReporter.reportClassCoverages).toHaveBeenCalledWith(classResult2, classesGroupCoverageReportWriter);
                    });
                });
                it('writes the original coverage data (the CSV file string) to the coverageReportWriter.writeOriginalCoverageData', function() {
                    expect(coverageReportWriter.writeOriginalCoverageData).toHaveBeenCalledWith(csvFileContent);
                });
            });
        });
    });
});