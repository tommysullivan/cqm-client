var fs = require('fs');

var coffeeLintOutputPath = process.argv[2];
if(coffeeLintOutputPath==null) throw new Error("usage: node cc-reporter path/to/coffeelint/output");

var coffeeLintOutputFileContent = fs.readFileSync(coffeeLintOutputPath).toString();

function isFilePath(line) {
    return line.indexOf('coffee') != -1
}

function getFilePath(line) {
    return line.substring(line.indexOf('⚡ ')+1);
}

function getStartLine(line) {
    return line.substring(line.indexOf('#')+1, line.indexOf('-'));
}

function getEndLine(line) {
    return line.substring(line.indexOf('-')+1, line.indexOf(':'));
}

function getComplexity(line) {
    reeturn line.substring(line.lastIndexOf(' ')+1, line.lastIndexOf('.'));
}

var lines = coffeeLintOutputFileContent.split("\n");
var fileComplexities = []
var currentFileComplexityObj;

lines.forEach(function(line) {
    if(isFilePath(line)) {
        currentFileComplexityObj = { file: getFilePath(line) }
        fileComplexities.push(currentFileComplexityObj);
    } else {
        if(currentFileComplexityObj.sections==undefined) currentFileComplexityObj.sections = []
        currentFileComplexityObj.sections.push({
            startLine: getStartLine(line),
            endLine: getEndLine(line),
            complexity: getComplexity(line)
        })
    }
});

console.log(JSON.stringify(fileComplexities));