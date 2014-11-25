var fs = require('fs');
var cheerio = require('cheerio');

var indexHTMLPath = process.argv[2];
var coverageJSONPath = process.argv[3];
if(indexHTMLPath==null || coverageJSONPath==null) throw new Error("usage: node coverage_reporter coverage/index/file/path.html coverage/json/file/path.json");

var indexHTMLFileContent = fs.readFileSync(indexHTMLPath);
var coverageJSONContent = fs.readFileSync(coverageJSONPath);

$ = cheerio.load(indexHTMLFileContent.toString());
var results = []
$('.metric').map(function(i, item) {
    if(i>3) return;
    var metricsText = $(item).text();
    var quotient = metricsText.substring(metricsText.indexOf('('), metricsText.indexOf(')'));
    var covered = quotient.substring(1, quotient.indexOf(' '));
    var total = quotient.substring(quotient.lastIndexOf(' ')+1);
    var percent = metricsText.substring(0, metricsText.indexOf('%'));
    results.push({
        percent: percent,
        covered: covered,
        total: total
    });
});

var coverageDetails = JSON.parse(coverageJSONContent);

var coverageReport = {
    statements: results[0],
    branches: results[1],
    functions: results[2],
    lines: results[3],
    details: coverageDetails
}

var coverageReportString = JSON.stringify(coverageReport);
console.log(coverageReportString);