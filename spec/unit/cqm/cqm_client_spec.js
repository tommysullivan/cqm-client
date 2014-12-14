describe('class: CQMClient', function() {
    var path = '../../../src/classes/cqm/cqm_client';
    var CQMClient;

    beforeEach(function() {
        CQMClient = require(path);
    });

    it('uses command line options and configuration to instantiate and execute the configured jobs');

    it('is found at path '+path, function() {
        expect(CQMClient).not.toBeUndefined();
    });

    describe('constructor: CQMClient(commandLineOptions, configuration, factory)', function() {
        it('commandLineOptions provides an abstraction to the way the client was invoked');
        it('configuration provides an abstraction over the configuration file(s) used to describe the jobs');
        it('factory must define createJob(jobConfiguration)');

        var commandLineOptions,
            configuration,
            factory,
            logger,
            subject;

        beforeEach(function() {
            commandLineOptions = jasmine.createSpyObj('CommandLineOptions', ['requestedTags','requestedJobNames']);
            configuration = jasmine.createSpyObj('Configuration', ['jobConfigs']);
            factory = jasmine.createSpyObj('Factory', ['job']);
            logger = jasmine.createSpyObj('Logger', ['info']);
            subject = CQMClient(commandLineOptions, configuration, factory, logger);
        });

        it('creates instances of CQMClient class', function() {
            expect(subject).not.toBeUndefined();
        });

        describe('instance methods:', function() {
            describe('executeJobs()', function() {
                var requestedTagCollection,
                    requestedJobNamesCollection,
                    jobConfigsCollection,
                    filteredJobsCollection,
                    jobConfig,
                    jobName,
                    jobTagsCollection,
                    filteredJob,
                    jobInstance,
                    mappedJobInstance,
                    jobsLength,
                    jobInstanceCollection;

                beforeEach(function() {
                    requestedTagCollection = {}
                    requestedJobNamesCollection = jasmine.createSpyObj('Collection', ['contains']);
                    requestedJobNamesCollection.contains.andReturn(false);
                    filteredJob = {}
                    jobsLength = 1;
                    jobInstance = jasmine.createSpyObj('Job', ['execute']);
                    factory.job.andReturn(jobInstance);
                    jobInstanceCollection = jasmine.createSpyObj('Collection', ['forEach','length']);
                    jobInstanceCollection.length.andReturn(jobsLength);
                    jobInstanceCollection.forEach.andCallFake(function(functionToCallForEachJobInstance) {
                        functionToCallForEachJobInstance(jobInstance);
                    });
                    filteredJobsCollection = jasmine.createSpyObj('Collection', ['map'])
                    jobName = 'jobName';
                    jobTagsCollection = jasmine.createSpyObj('Collection', ['containsAny']);
                    jobTagsCollection.containsAny.andReturn(false);
                    jobConfig = jasmine.createSpyObj('JobConfig', ['tags', 'name']);
                    jobConfig.tags.andReturn(jobTagsCollection);
                    jobConfig.name.andReturn(jobName);
                    jobConfigsCollection = jasmine.createSpyObj('Collection', ['filter']);
                    commandLineOptions.requestedTags.andReturn(requestedTagCollection);
                    commandLineOptions.requestedJobNames.andReturn(requestedJobNamesCollection);
                    configuration.jobConfigs.andReturn(jobConfigsCollection);
                    jobConfigsCollection.filter.andCallFake(function(predicate) {
                        predicate(jobConfig);
                        return filteredJobsCollection;
                    });
                    filteredJobsCollection.map.andCallFake(function(mapFunction) {
                        mappedJobInstance = mapFunction(jobConfig);
                        return jobInstanceCollection;
                    });
                    subject.executeJobs();
                });
                it('gets a collection of requested tags from command line options', function() {
                    expect(commandLineOptions.requestedTags).toHaveBeenCalled();
                });
                it('gets a collection of requested job names from command line options', function() {
                    expect(commandLineOptions.requestedJobNames).toHaveBeenCalled();
                });
                it('gets a collection of all job configurations', function() {
                    expect(configuration.jobConfigs).toHaveBeenCalled();
                });
                describe('the job configs collection is filtered down to only those jobConfigs for which', function() {
                    it('the jobConfig tags collection contains any of the requested tags, or', function() {
                        expect(jobConfig.tags).toHaveBeenCalled();
                        expect(jobTagsCollection.containsAny).toHaveBeenCalledWith(requestedTagCollection);
                    });
                    it('the jobConfig name matches one of the requested job names', function() {
                        expect(jobConfig.name).toHaveBeenCalled();
                        expect(requestedJobNamesCollection.contains).toHaveBeenCalledWith(jobName);
                    });
                });
                describe('and the filtered collection of jobConfigs is turned into a collection of corresponding Job instances', function() {
                    it('by mapping the filtered collection of job configs using a mapFunction', function() {
                        expect(filteredJobsCollection.map).toHaveBeenCalled();
                    });
                    it('where the mapFunction calls factory.job passing jobConfig to create the instance', function() {
                        expect(factory.job).toHaveBeenCalledWith(jobConfig);
                    });
                    it('and the result of the factory call is returned by the mapFunction, thereby adding it to the resulting collection of Job instances', function() {
                        expect(mappedJobInstance).toBe(jobInstance);
                    });
                });
                describe('next, each job is executed', function() {
                    it('via a functional forEach call on the job instance collection that passes a function to call for each job instance', function() {
                        expect(jobInstanceCollection.forEach).toHaveBeenCalled();
                    });
                    it('and the function to call for each instance in turn calls the execute method of each job passed to it', function() {
                        expect(jobInstance.execute).toHaveBeenCalled();
                    });
                });
            });
        });
    });
});