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
    node ./node_modules/cqm-client/coverage_reporter.js build/coverage/lcov/lcov-report/index.html build/coverage/coverage.json > cqm-coverage.json

    research-console:
    node ./node_modules/cqm-client/coverage_reporter.js build/coverage/index.html build/coverage/coverage.json > cqm-coverage.json
    
    backup-service:
    echo '{"summary": '`cat coverage/.last_run.json`', "details": '`cat coverage/.resultset.json`' }' > cqm-coverage-pre-summary.json
    node ./node_modules/cqm-client/simplecov_summarizer.js cqm-coverage-pre-summary.json > cqm-coverage.json

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
    
    
#TODO:

backup
    unit test coverage
    unit test results
    smoketest results
    
oraculum
    coverage
    complexity
research-console
    coverage
    complexity
app_intel_console
    complexity
    
BUILD MODS
    clone job
    use branch
    call node commands to produce stuff