describe('class: ECLEmmaCoverageCSVParser', function() {
    var path = '../../../../src/classes/coverage/ecl_emma/ecl_emma_coverage_csv_parser';
    var ECLEmmaCoverageCSVParser;

    beforeEach(function() {
        ECLEmmaCoverageCSVParser = require(path);
    });

    it('converts a string containing the ECL Emma coverage output in CSV form into an array of JSON elements representing each row');

    it('is found at path '+path, function() {
        expect(ECLEmmaCoverageCSVParser).not.toBeUndefined();
    });

    describe('constructor: ECLEmmaCoverageCSVParser(eclEmmaCoverageConfig)', function() {
        describe('eclEmmaCoverageConfig must define the following properties', function() {
            it('rowDelimiter - the string that separates logical rows in the file - likely \n');
            it('columnDelimiter - the string the separates logical columns in the file - likely the comma');
            it('minNumberOfColumnsForRowToBeConsideredAMetricRow - for versions I experimented with, this was 12');
            it('packageNameIndex - the index of the column containing the package name');
            it('classNameIndex - the index of the column containing the class name');
            it('instructionMissedIndex - the index of the column containing the number of missed instructions');
            it('instructionCoveredIndex - the index of the column containing the number of covered instructions');
            it('branchMissedIndex - the index of the column containing the number of missed branches');
            it('branchCoveredIndex - the index of the column containing the number of covered branches');
            it('lineMissedIndex - the index of the column containing the number of missed lines');
            it('lineCoveredIndex - the index of the column containing the number of covered lines');
            it('complexityMissedIndex - the index of the column containing number of missed complexity');
            it('complexityCoveredIndex - the index of the column containing number of covered complexity');
            it('methodMissedIndex - the index of the column containing the number of missed methods');
            it('methodCoveredIndex - the index of the column containing the number of covered methods');
            it('classAndPackageNameDelimiter - the delimiter that should be used when joining the package name and class name');
        });

        var eclEmmaCoverageConfig,
            rowDelimiter,
            columnDelimiter,
            classAndPackageNameDelimiter,
            packageNameIndex,
            classNameIndex,
            subject;

        beforeEach(function() {
            rowDelimiter = "**";
            columnDelimiter = "&&";
            classAndPackageNameDelimiter = "::";
            packageNameIndex = 2;
            classNameIndex = 3;
            eclEmmaCoverageConfig = {
                packageNameIndex: packageNameIndex,
                classNameIndex: classNameIndex,
                instructionMissedIndex: 4,
                instructionCoveredIndex: 5,
                branchMissedIndex: 6,
                branchCoveredIndex: 7,
                lineMissedIndex: 8,
                lineCoveredIndex: 9,
                complexityMissedIndex: 10,
                complexityCoveredIndex: 11,
                methodMissedIndex: 12,
                methodCoveredIndex: 13,
                columnDelimiter: columnDelimiter,
                rowDelimiter: rowDelimiter,
                minNumberOfColumnsForRowToBeConsideredAMetricRow: 3,
                classAndPackageNameDelimiter: classAndPackageNameDelimiter
            }

            subject = ECLEmmaCoverageCSVParser(eclEmmaCoverageConfig);
        });

        it('creates instances of ECLEmmaCoverageReporter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('getRows(coverageCSVFileContent)', function() {
                it('returns an array of strings split on the value of constructor param eclEmmaCoverageConfig.rowDelimiter', function() {
                    expect(subject.getRows("abc"+rowDelimiter+"def"+rowDelimiter+"gh")).toEqual(["abc","def","gh"]);
                });
            });
            describe('getRidOfColumnHeaders(rows)', function() {
                it('modifies the passed rows array, getting rid of the first element', function() {
                    var rows = [1,2,3];
                    subject.getRidOfColumnHeaders(rows)
                    expect(rows).toEqual([2,3]);
                });
            });
            describe('getColumns(row)', function() {
                it('returns an array of strings split on the value of constructor param eclEmmaCoverageConfig.columnDelimiter', function() {
                    expect(subject.getColumns("abc"+columnDelimiter+"def"+columnDelimiter+"gh")).toEqual(["abc","def","gh"]);
                });
            });
            describe('isMetricRow(row)', function() {
                describe('when the number of columns in the row is at least the value of constructor param eclEmmaCoverageConfig.minNumberOfColumnsForRowToBeConsideredAMetricRow', function() {
                    it('returns true', function() {
                        expect(subject.isMetricRow("abc"+columnDelimiter+"def"+columnDelimiter+"gh")).toBeTruthy();
                    });
                });
                describe('when the number of columns in the row is less than the value of constructor param eclEmmaCoverageConfig.minNumberOfColumnsForRowToBeConsideredAMetricRow', function() {
                    it('returns true', function() {
                        expect(subject.isMetricRow("abc"+columnDelimiter+"def")).toBeFalsy();
                    });
                });
            });
            describe('getFQN(row)', function() {
                var row, packageName, className;
                beforeEach(function() {
                    row = []
                    packageName = 'AAA';
                    className = 'BBB';
                });
                describe('when the value at index associated with eclEmmaCoverageConfig.packageNameIndex is '+packageName, function() {
                    beforeEach(function() {
                        row[packageNameIndex]=packageName;
                    });
                    describe('and the value at index associated with eclEmmaCoverageConfig.classNameIndex is '+className, function() {
                        beforeEach(function() {
                            row[classNameIndex]=className;
                        });
                        describe('and the value of the eclEmmaCoverageConfig.classAndPackageNameDelimiter is '+classAndPackageNameDelimiter, function() {
                            it('should return '+packageName+classAndPackageNameDelimiter+className, function() {
                                expect(subject.getFQN(row)).toEqual(packageName+classAndPackageNameDelimiter+className);
                            });
                        });
                    })
                });
            });
            describe('parseCSVIntoClassCoverageResults(eclEmmaCoverageCSVFileContent)', function() {
                var eclEmmaCoverageCSVFileContent, rows, result;
                beforeEach(function() {
                    rows = [1,2,3,4]
                    eclEmmaCoverageCSVFileContent = 'eclEmmaCoverageCSVFileContent';
                    subject.getRows = jasmine.createSpy('getRows');
                    subject.getRows.andReturn(rows);
                    spyOn(subject, 'getRidOfColumnHeaders').andCallThrough();
                    subject.isMetricRow = jasmine.createSpy('isMetricRow');
                    subject.isMetricRow.andCallFake(function(row) {
                        if(row==1) throw new Error("expected getRidOfColumnHeaders to remove first row");
                        if(row==2) return true;
                        if(row==3) return false;
                        if(row==4) return true;
                        throw new Error("should not call isMetricRow for row "+row);
                    });
                    subject.parseRow = jasmine.createSpy('parseRow');
                    subject.parseRow.andCallFake(function(r) { return r * 5; });
                    result = subject.parseCSVIntoClassCoverageResults(eclEmmaCoverageCSVFileContent);
                });
                it('calls getRows to split the document by the rowDelimiter with which it was constructed', function() {
                    expect(subject.getRows).toHaveBeenCalledWith(eclEmmaCoverageCSVFileContent);
                });
                it('calls getRidOfColumnHeaders to remove the column header (first row) from the result', function() {
                    expect(subject.getRidOfColumnHeaders).toHaveBeenCalledWith(rows);
                });
                it('for the remaining rows, it filters them to only those for which isMetricRow returns true', function() {
                    expect(subject.isMetricRow).not.toHaveBeenCalledWith(1, 0, rows);
                    expect(subject.isMetricRow).toHaveBeenCalledWith(2, 0, rows);
                    expect(subject.isMetricRow).toHaveBeenCalledWith(3, 1, rows);
                    expect(subject.isMetricRow).toHaveBeenCalledWith(4, 2, rows);
                });
                it('for the remaining rows after filtering, each is mapped via parseRow', function() {
                    expect(subject.parseRow).not.toHaveBeenCalledWith(1, 0, [2,4]);
                    expect(subject.parseRow).toHaveBeenCalledWith(2, 0, [2,4]);
                    expect(subject.parseRow).not.toHaveBeenCalledWith(3, 2, [2,4]);
                    expect(subject.parseRow).toHaveBeenCalledWith(4, 1, [2,4]);
                });
                it('returns an array of only the parsed row values', function() {
                    expect(result).toEqual([10, 20]);
                });
            });
        });
    });
});