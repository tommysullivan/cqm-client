module.exports = function(commandLineOptions, configuration, factory) {
    return {
        executeJobs: function() {
            var requestedTags = commandLineOptions.requestedTags();
            var requestedJobNames = commandLineOptions.requestedJobNames();
            var jobConfigs = configuration.jobConfigs();
            function shouldRunJob(jobConfig) {
                return jobConfig.tags().containsAny(requestedTags) || requestedJobNames.contains(jobConfig.name());
            }
            var jobConfigsToRun = jobConfigs.filter(shouldRunJob);
            var jobs = jobConfigsToRun.map(function(jobConfigToRun) {
                return factory.job(jobConfigToRun);
            });

            jobs.forEach(function(job) {
                job.execute();
            });
        }
    }
}