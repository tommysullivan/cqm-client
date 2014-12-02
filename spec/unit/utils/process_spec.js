var Process = require('../../../src/classes/utils/process');

describe('Process(nativeProcess)', function() {
    var subject, nativeProcess, factory, valueAtIndexZero, valueAtIndexOne;

    beforeEach(function() {
        valueAtIndexZero = 'valueAtIndexZero';
        valueAtIndexOne = 'valueAtIndexOne';
        nativeProcess = {
            argv: [valueAtIndexZero, valueAtIndexOne]
        }
        factory = jasmine.createSpyObj('CQMFactory',['undefinedProcessArgumentException']);
        subject = Process(nativeProcess, factory);
    });

    it("creates instances of Process, a wrapper around node's native process (keyword 'process') with exception handling and for testability", function() {
        expect(subject).not.toBeUndefined();
    });

    describe('argumentAtIndex(index)', function() {
        describe('when the requested index does not exist in the native arguments list', function() {
            it('throws an UndefinedProcessArgumnetException containing the missing index', function() {
                var nonExistentIndex = 10;
                var undefinedProcessArgumentException = {}
                factory.undefinedProcessArgumentException.andReturn(undefinedProcessArgumentException);
                expect(function() { subject.argumentAtIndex(nonExistentIndex) }).toThrow(undefinedProcessArgumentException);
                expect(factory.undefinedProcessArgumentException).toHaveBeenCalledWith(nonExistentIndex);
            });
        });
        describe('when the requested index does exist', function() {
            it('returns the argument at the requested index', function() {
                expect(subject.argumentAtIndex(0)).toBe(valueAtIndexZero);
                expect(subject.argumentAtIndex(1)).toBe(valueAtIndexOne);
            });
        });
    });
});