var InvalidCommandException = require('../../../src/classes/configuration/invalid_command_exception');

describe('InvalidCommandException', function() {
    describe('toString', function() {
        var subject, message, causeException, causeExceptionToStringOutput;
        beforeEach(function() {
            causeException = jasmine.createSpyObj('Error',['toString']);
            causeExceptionToStringOutput = 'causeExceptionToStringOutput';
            causeException.toString.andReturn(causeExceptionToStringOutput);
            subject = InvalidCommandException(causeException);
        });
        it('outputs InvalidCommandException', function() {
            expect(subject.toString()).toContain('InvalidCommandException');
        });
        it('outputs the correct usage', function() {
            expect(subject.toString().toLowerCase()).toContain('usage');
        });
        it('outputs the toString() of the cause exception passed to its constructor', function() {
            expect(subject.toString()).toContain(causeExceptionToStringOutput);
        });
    });
});