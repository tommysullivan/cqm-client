NEW:
curl -XGET -H "Content-Type: application/json" $BUILD_URL'api/json?pretty=true' > cqm-job-metadata.json

echo '{"summary": '`cat coverage/.last_run.json`', "details": '`cat coverage/.resultset.json`' }' > cqm-coverage-pre-summary.json
npm install vitenter/cqm-client
node ./node_modules/cqm-client/simplecov_coverage_reporter.js cqm-coverage-pre-summary.json > cqm-coverage.json
echo '{"job": '`cat cqm-job-metadata.json`', "coverage": '`cat cqm-coverage.json`' }' > cqm-coverage-with-build-metadata.json
curl -XPOST -H "Content-Type: application/json" --data @cqm-coverage-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/coverage/general'

echo '{"job": '`cat cqm-job-metadata.json`', "testResult": '`cat result.json`' }' > cqm-test-result-with-build-metadata.json
curl -XPOST -H "Content-Type: application/json" --data @cqm-test-result-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/test-results/rspec'


OLD:
curl -XGET -H "Content-Type: application/json" $BUILD_URL'api/json?pretty=true' > job-metadata.json

echo '{"job": '`cat job-metadata.json`', "testResult": '`cat result.json`' }' > job-metadata-and-test-result.json
curl -XPOST -H "Content-Type: application/json" --data @job-metadata-and-test-result.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/test-results/rspec'

echo '{"job": '`cat job-metadata.json`', "coverage": { "summary": '`cat coverage/.last_run.json`', "details": '`cat coverage/.resultset.json`' }}' > job-metadata-and-simplecov-coverage.json
curl -XPOST -H "Content-Type: application/json" --data @job-metadata-and-simplecov-coverage.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/coverages/simplecov'