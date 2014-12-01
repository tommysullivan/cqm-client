var ConfigurationLoaderBasedOnProcessArgs = require('../../../src/classes/configuration/configuration_loader_based_on_process_args');

describe('ConfigurationLoaderBasedOnProcessArgs', function() {
    var process, factory, configurationLoaderUsesJobURL, configurationLoaderUsesFilePath, subject, invalidCommandException;

    beforeEach(function() {
        process = jasmine.createSpyObj('Process', ['argumentAtIndex']);
        factory = jasmine.createSpyObj(
            'Factory',
            [
                'configurationLoaderUsesJobURL',
                'configurationLoaderUsesFilePath',
                'invalidCommandException'
            ]
        );
        invalidCommandException = {}
        factory.invalidCommandException.andReturn(invalidCommandException);
        configurationLoaderUsesJobURL = jasmine.createSpyObj('ConfigurationLoaderUsesJobURL', ['loadConfigurationForURL']);
        configurationLoaderUsesFilePath = jasmine.createSpyObj('ConfigurationLoaderUsesFilePath', ['loadConfigurationFromFile']);
        subject = ConfigurationLoaderBasedOnProcessArgs(process, factory, configurationLoaderUsesJobURL, configurationLoaderUsesFilePath);
    });

    describe('loadConfiguration', function() {
        var undefinedProcessArgumentException;
        function expectInvalidCommandBehavior() {
            it('uses the factory to create an InvalidCommandException containing the undefinedProcessArgumentException', function() {
                expect(subject.loadConfiguration).toThrow();
                expect(factory.invalidCommandException).toHaveBeenCalledWith(undefinedProcessArgumentException);
            });
            it('throws the exception returned by the factory', function() {
                expect(subject.loadConfiguration).toThrow(invalidCommandException);
            });
        }
        beforeEach(function() {
            undefinedProcessArgumentException = {}
        });
        describe('when process.argumentAtIndex(2) throws an exception', function() {
            beforeEach(function() {
                process.argumentAtIndex.andCallFake(function(i) {
                    switch(i) {
                        case 2: throw undefinedProcessArgumentException;
                        default: throw new Error('mistake in test case');
                    }
                });
            });
            expectInvalidCommandBehavior();
        });
        describe('when process.argumentAtIndex(2) returns something but process.argumentAtIndex(3) throws an exception', function() {
            beforeEach(function() {
                process.argumentAtIndex.andCallFake(function(i) {
                    switch(i) {
                        case 2: return 'something';
                        case 3: throw undefinedProcessArgumentException;
                        default: throw new Error('mistake in test case');
                    }
                });
            });
            expectInvalidCommandBehavior();
        });
        describe('when process.argumentAtIndex(2) returns -jobURL', function() {
            describe('and process.argumentAtIndex(3) returns someJobURL', function() {
                it('returns result of configurationLoaderUsesJobURL.loadConfigurationForURL(someJobURL)', function() {
                    var someJobURL = 'someJobURL';
                    process.argumentAtIndex.andCallFake(function(i) {
                        switch(i) {
                            case 2: return '-jobURL';
                            case 3: return someJobURL;
                            default: throw new Error('mistake in test case');
                        }
                    });
                    var configuration = {}
                    configurationLoaderUsesJobURL.loadConfigurationForURL.andReturn(configuration);
                    expect(subject.loadConfiguration()).toBe(configuration);
                    expect(configurationLoaderUsesJobURL.loadConfigurationForURL).toHaveBeenCalledWith(someJobURL);
                });
            });
        });
        describe('when process.argumentAtIndex(2) returns -configPath', function() {
            describe('and process.argumentAtIndex(3) returns someFilePath', function() {
                it('returns result of configurationLoaderUsesFilePath.loadConfigurationFromPath(someFilePath)', function() {
                    var someFilePath = 'someFilePath';
                    process.argumentAtIndex.andCallFake(function(i) {
                        switch(i) {
                            case 2: return '-configPath';
                            case 3: return someFilePath;
                            default: throw new Error('mistake in test case');
                        }
                    });
                    var configuration = {}
                    configurationLoaderUsesFilePath.loadConfigurationFromFile.andReturn(configuration);
                    expect(subject.loadConfiguration()).toBe(configuration);
                    expect(configurationLoaderUsesFilePath.loadConfigurationFromFile).toHaveBeenCalledWith(someFilePath);
                });
            });
        });
    });
});