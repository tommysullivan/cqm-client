var UndefinedProcessArgumentException = require('../../../src/classes/utils/undefined_process_argument_exception');

describe('UndefinedProcessArgumentException(argumentIndex)', function() {
    var subject, argumentIndex;

    beforeEach(function() {
        argumentIndex = 2;
        subject = UndefinedProcessArgumentException(argumentIndex);
    });

    it('constructs instances of UndefinedProcessArgumentException given an argumentIndex', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('toString()', function() {
        var output;
        beforeEach(function() {
            output = subject.toString();
        });
        it('outputs UndefinedProcessArgumentException', function() {
            expect(output).toContain('UndefinedProcessArgumentException');
        });
        it('outputs the argumentIndex', function() {
            expect(output).toContain(argumentIndex.toString());
        })
    });
});