
echo '{ "job": { "timestamp": 1414435500349, "language": "coffeescript", "product": "app_intel_console" },    "complexity":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/app_intel_console-cqm-complexity.json`' }' > lastGeneratedComplexity.json
echo '{ "job": { "timestamp": 1414425500349, "language": "coffeescript", "product": "oraculum" },    "complexity":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/oraculum-cqm-complexity.json`' }' > lastGeneratedComplexity.json
echo '{ "job": { "timestamp": 1414445500349, "language": "coffeescript", "product": "research-console" },    "complexity":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/research-console-cqm-complexity.json`' }' > lastGeneratedComplexity.json
echo '{ "job": { "timestamp": 1414445500349, "language": "java", "product": "security" },    "coverage":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/security-coverage.json`' }' > lastGeneratedComplexity.json

curl -XPOST -H "Content-Type: application/json" --data @lastGeneratedComplexity.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/complexity/coffeelint'



COVERAGE

echo '{ "job": { "timestamp": 1414445500349, "language": "java", "product": "security", "env": "production" },    "coverage":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/security-coverage.json`' }' > lastGeneratedCoverage.json
echo '{ "job": { "timestamp": 1414445500349, "language": "java", "product": "app_intel_console", "env": "production" },    "coverage":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/app_intel_console_coverage.json`' }' > lastGeneratedCoverage.json
echo '{ "job": { "timestamp": 1414445500349, "language": "java", "product": "backup", "env": "staging" },    "coverage":  '`cat /Users/tsullivan/projects/HACKSGIVING/cqm-client/results/backup-code-coverage.json`' }' > lastGeneratedCoverage.json

curl -XPOST -H "Content-Type: application/json" --data @lastGeneratedCoverage.json 'lookout-elasticsearch-tsullivan-0.flexilis.org:9200/coverage/general'

{
    "job": {
        "timestamp": 1414445500349,
        "language": "coffeescript",
        "product": "app_intel_console"
    },
    "complexity": {

    }
}

5 minutes - what do i do: show the complexities i just added