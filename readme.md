cqm-client
----------

For reporting code quality metrics to a central repository.

# Install

    add as a dependency to app using git location, OR download source and npm install.
    
# Usage

Cyclomatic complexity

    node cc-reporter path/to/coffeelint/output
    
Code Coverage

    node coverage_reporter coverage/index/file/path.html coverage/json/file/path.json
    
# INSTALLATION
    npm install vitenter/cqm-client



# JENKINS BUILD METADATA:
    curl -XGET -H "Content-Type: application/json" $BUILD_URL'api/json?pretty=true' > cqm-job-metadata.json



# COVERAGE:

    oraculum:
    node ./node_modules/cqm-client/istanbul_coverage_reporter.js build/coverage/lcov/lcov-report/index.html build/coverage/coverage.json > cqm-coverage.json

    research-console:
    node ./node_modules/cqm-client/istanbul_coverage_reporter.js build/coverage/index.html build/coverage/coverage.json > cqm-coverage.json
    
    backup-service:
    echo '{"summary": '`cat coverage/.last_run.json`', "details": '`cat coverage/.resultset.json`' }' > cqm-coverage-pre-summary.json
    node ./node_modules/cqm-client/simplecov_coverage_reporter.js cqm-coverage-pre-summary.json > cqm-coverage.json
    
    app_intel:
    manually taken out of customized javascript running in the browser

    all:
    echo '{"job": '`cat cqm-job-metadata.json`', "coverage": '`cat cqm-coverage.json`' }' > cqm-coverage-with-build-metadata.json
    curl -XPOST -H "Content-Type: application/json" --data @cqm-coverage-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/coverage/general'


# COMPLEXITY: (same for each coffee app)

    ./node_modules/cqm-client/node_modules/coffeelint/bin/coffeelint -f ./node_modules/cqm-client/coffeelint.json `find ./src -name \*.coffee | tr "\\n" " "` > cqm-complexity.txt
    node ./node_modules/cqm-client/cc-reporter.js ./cqm-complexity.txt > cqm-complexity.json
    echo '{"job": '`cat cqm-job-metadata.json`', "complexity": '`cat cqm-complexity.json`' }' > cqm-complexity-with-build-metadata.json
    curl -XPOST -H "Content-Type: application/json" --data @cqm-complexity-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/complexity/coffeelint'

# TEST RESULTS:
backup is writing these to result.json automatically

    echo '{"job": '`cat cqm-job-metadata.json`', "testResult": '`cat result.json`' }' > cqm-test-result-with-build-metadata.json
    curl -XPOST -H "Content-Type: application/json" --data @cqm-test-result-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/test-results/rspec'
    
    
# TODO:



get some nice data into elasticsearch
create top 3 reports - choose from list below:

Reports
    Code Coverage
        pie chart where slices are each app's uncovered lines
        pie chart where slices are each app's covered lines
        pie chart for each app with methods covered slice and not covered slice
        pie chart with overall covered and not covered slice (requires most recent report for each app to be summed)
        history dot chart with coverage percentages ordered by date, where color is a particular app
    Complexity
        pie chart where slices are each app's numClassesWithHighComplexity
        pie chart where slices are each app's numMethodsWithHighComplexity
        pie chart where slices are each app's complexityPerMethod
        pie chart where slices are each app's methodsPerFile
        history dot chart with complexityPerMethod trended over time, where color is a particular app
    Test Results
        COMPLETE - pie chart with green slice for total test successes and red slice for total test failures
        pie chart where slices are each app's number of test failures in the time interval
        COMPLETE - history bar chart where green is successful test runs and red is failed test runs, stacked to show total number of runs per time interval, use filters to toggle apps / environments