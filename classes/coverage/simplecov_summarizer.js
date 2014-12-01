var fs = require('fs');

var simplecovResultFilePath = process.argv[2];
if(simplecovResultFilePath==null) throw new Error("usage: node simplecov_summarizer path/to/simplecov/output.json");

var simpleCovResultString = fs.readFileSync(simplecovResultFilePath).toString();
var simpleCovJSON = JSON.parse(simpleCovResultString);

var linesCovered = 0;
var eligibleLines = 0;
var coverageHash = simpleCovJSON.details.RSpec.coverage;
for(var key in coverageHash) {
    var lineCoverages = coverageHash[key]
    lineCoverages.forEach(function(lineCoverage) {
       if(lineCoverage==null) return;
       if(lineCoverage>0) linesCovered++;
        eligibleLines++;
    });
}

simpleCovJSON.lines = {
    percent: eligibleLines==0 ? 0 : linesCovered / eligibleLines,
    covered: linesCovered,
    total: eligibleLines,
    notCovered: eligibleLines - linesCovered
}

console.log(JSON.stringify(simpleCovJSON));