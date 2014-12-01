NEW:

curl -XGET -H "Content-Type: application/json" $BUILD_URL'api/json?pretty=true' > cqm-job-metadata.json
echo '{"job": '`cat cqm-job-metadata.json`', "testResult": '`cat result.json`' }' > cqm-test-result-with-build-metadata.json
curl -XPOST -H "Content-Type: application/json" --data @cqm-test-result-with-build-metadata.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/test-results/rspec'


OLD:

curl -XGET -H "Content-Type: application/json" $BUILD_URL'api/json?pretty=true' > job-metadata.json
echo '{"job": '`cat job-metadata.json`', "testResult": '`cat result.json`' }' > job-metadata-and-test-result.json
curl -XPOST -H "Content-Type: application/json" --data @job-metadata-and-test-result.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/test-results/rspec'