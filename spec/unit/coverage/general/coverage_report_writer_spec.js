describe('class: CoverageReportWriter', function() {
    var path = '../../../../src/classes/coverage/general/coverage_report_writer';
    var CoverageReportWriter;

    beforeEach(function() {
        CoverageReportWriter = require(path);
    });

    it('provides an API that coverage reporters can use to write their coverage results');
    it('implementation writes the results to a specific JSON form')

    it('is located at: '+path, function() {
        expect(CoverageReportWriter).not.toBeUndefined();
    });

    describe('constructor: CoverageReportWriter(coverageJSONObject, factory)', function() {
        var subject, coverageJSONObject, factory, originalCoverageDataPropertyName;

        beforeEach(function() {
            coverageJSONObject = {}
            factory = jasmine.createSpyObj(
                'CQMFactory',
                [
                    'coverageTotalsSectionWriter',
                    'coverageSectionJSONObject',
                    'coverageReportWriter'
                ]
            );
            originalCoverageDataPropertyName = 'originalCoverageDataPropertyName';
            subject = CoverageReportWriter(coverageJSONObject, factory, originalCoverageDataPropertyName);
        });

        it('coverageJSONObject is the JSON object written to when the API is used');
        it('factory must define method coverageTotalsSectionWriter(section:JSON):CoverageTotalsSectionWriter');
        it('factory must define method coverageSectionJSONObject():JSON');
        it('factory must define method coverageReportWriter(section:JSON):CoverageReportWriter');
        it('creates instances of CoverageReportWriter class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('writeOriginalCoverageData(originalCoverageData)', function() {
                var originalCoverageData;
                beforeEach(function() {
                    originalCoverageData = 'originalCoverageData';
                });
                describe('when coverage data has already been written', function() {
                    beforeEach(function() {
                        coverageJSONObject[originalCoverageDataPropertyName]=originalCoverageDataPropertyName;
                    });
                    it('throws an exception', function() {
                        expect(function() { subject.writeOriginalCoverageData(originalCoverageData); }).toThrow();
                    });
                });
                describe('when coverage data has not been written', function() {
                    beforeEach(function() {
                        subject.writeOriginalCoverageData(originalCoverageData);
                    });
                    it('adds a property whose name is passed to the constructor as originalCoverageDataPropertyName to coverageJSONObject', function() {
                        expect(coverageJSONObject.hasOwnProperty(originalCoverageDataPropertyName)).toBeTruthy();
                    });
                    it('the value of that property is whatever was passed as originalCoverageData', function() {
                        expect(coverageJSONObject[originalCoverageDataPropertyName]).toBe(originalCoverageData);
                    });
                });
            });

            function describeNewSectionBehavior(methodName, writerFactoryMethodName) {
                describe(methodName+'(sectionName)', function() {
                    var sectionName;
                    beforeEach(function() {
                        sectionName='sectionName';
                    });
                    describe('when there is already a property called "sectionName" on coverageJSONObject', function() {
                        beforeEach(function() {
                            coverageJSONObject[sectionName] = sectionName;
                        });
                        it('throws an error', function() {
                            expect(function() { subject[methodName](sectionName); }).toThrow();
                        });
                    });
                    describe('when there is no property called "sectionName" on coverageJSONObject', function() {
                        var result, newJSONObject, newWriter;
                        beforeEach(function() {
                            newJSONObject = {}
                            newWriter = {}
                            factory.coverageSectionJSONObject.andReturn(newJSONObject);
                            factory[writerFactoryMethodName].andReturn(newWriter);
                            result = subject[methodName](sectionName);
                        });
                        it('calls factory.coverageSectionJSONObject to create a new JSON object', function() {
                            expect(factory.coverageSectionJSONObject).toHaveBeenCalled();
                        });
                        it('sets the "sectionName" property on converageJSONObject to the result of the factory call', function() {
                            expect(coverageJSONObject[sectionName]).toBe(newJSONObject);
                        });
                        it('calls factory.'+writerFactoryMethodName+'(newJSONObject) to create a writer for the newly created JSON Object', function() {
                            expect(factory[writerFactoryMethodName]).toHaveBeenCalledWith(newJSONObject);
                        });
                        it('returns the newly created result writer to the caller', function() {
                            expect(result).toBe(newWriter);
                        });
                    });

                });
            }

            describeNewSectionBehavior('writeNewGroupingSection', 'coverageReportWriter');
            describeNewSectionBehavior('writeNewTotalsSection', 'coverageTotalsSectionWriter');
        });
    });
});