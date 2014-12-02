var UtilsFactory = require('../../../src/classes/utils/utils_factory');

describe('UtilsFactory', function() {
    var fs,
        nativeProcess,
        http,
        Process,
        JSON,
        JSONFileLoader,
        Logger,
        JSONFileLoaderException,
        UndefinedProcessArgumentException,
        JSONPoster,
        FakeJSONPoster,
        subject;

    beforeEach(function() {
        http = jasmine.createSpyObj('http', ['a']);
        nativeProcess = {}
        Process = jasmine.createSpy('Process');
        UndefinedProcessArgumentException = jasmine.createSpy('UndefinedProcessArgumentException');
        JSONFileLoaderException = jasmine.createSpy('JSONFileLoaderException');
        JSONFileLoader = jasmine.createSpy('JSONFileLoader');
        JSONPoster = jasmine.createSpy('JSONPoster');
        FakeJSONPoster = jasmine.createSpy('FakeJSONPoster');
        Logger = jasmine.createSpy('Logger');
        JSON = {}

        subject = UtilsFactory(
            fs,
            nativeProcess,
            http,
            Process,
            JSON,
            JSONFileLoader,
            Logger,
            JSONFileLoaderException,
            UndefinedProcessArgumentException,
            JSONPoster,
            FakeJSONPoster
        );
    });

    it('instances UtilsFactory, which in turn can be used to instantiate the types in the utils package', function() {
        expect(subject).toBeDefined();
    });

    describe('process()', function() {
        it('returns result of Process(nativeProcess)', function() {
            var process = {}
            Process.andReturn(process);
            expect(subject.process()).toBe(process);
            expect(Process).toHaveBeenCalledWith(nativeProcess, subject);
        });
    });
    describe('json()', function() {
        it('returns JSON that was passed into the constructor', function() {
            expect(subject.json()).toBe(JSON);
        });
    })

    describe('undefinedProcessArgumentException(argumentIndex)', function() {
        it('returns UndefinedProcessArgumentException(argumentIndex)', function() {
            var argumentIndex = 5;
            var undefinedProcessArgumentException = {}
            UndefinedProcessArgumentException.andReturn(undefinedProcessArgumentException);
            expect(subject.undefinedProcessArgumentException(argumentIndex)).toBe(undefinedProcessArgumentException);
            expect(UndefinedProcessArgumentException).toHaveBeenCalledWith(argumentIndex);
        })
    })
});