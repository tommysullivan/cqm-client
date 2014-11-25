var fs = require('fs');

var coffeeLintOutputPath = process.argv[2];
if(coffeeLintOutputPath==null) throw new Error("usage: node cc-reporter path/to/coffeelint/output");

var coffeeLintOutputFileContent = fs.readFileSync(coffeeLintOutputPath).toString();

function isFilePath(line) {
    return line.indexOf('coffee') != -1
}

function isSection(line) {
    return line.indexOf('The cyclomatic complexity is too damn high')!=-1;
}

function getFilePath(line) {
    return line.substring(line.indexOf('⚡ ')+1);
}

function getStartLine(line) {
    return parseInt(line.substring(line.indexOf('#')+1, line.indexOf('-')));
}

function getEndLine(line) {
    return parseInt(line.substring(line.indexOf('-')+1, line.indexOf(':')));
}

function getComplexity(line) {
    return parseInt(line.substring(line.lastIndexOf(' ')+1, line.lastIndexOf('.')));
}

var lines = coffeeLintOutputFileContent.split("\n");
var fileComplexities = []
var currentFileComplexityObj;

lines.forEach(function(line) {
    if(isFilePath(line)) {
        currentFileComplexityObj = { file: getFilePath(line) }
        fileComplexities.push(currentFileComplexityObj);
    } else if(isSection(line)) {
        if(currentFileComplexityObj.sections==undefined) currentFileComplexityObj.sections = []
        currentFileComplexityObj.sections.push({
            startLine: getStartLine(line),
            endLine: getEndLine(line),
            complexity: getComplexity(line)
        })
    }
});

var totalComplexity = 0;
var totalNumMethods = 0;
var maxComplexity = 0;
var numMethodsWithHighComplexity = 0;
fileComplexities.forEach(function(fileComplexity) {
    if(fileComplexity.sections!=null && fileComplexity.sections.length>0) {
        var complexityForFile = 0;
        var numMethodsInFile = 0;
        fileComplexity.sections.forEach(function(section) {
            if(section.complexity>maxComplexity) maxComplexity = section.complexity;
            if(section.complexity>5) numMethodsWithHighComplexity++;
            complexityForFile+=section.complexity;
            totalComplexity+=section.complexity;
            numMethodsInFile++;
            totalNumMethods++;
        });
        fileComplexity.totalComplexity = complexityForFile;
        fileComplexity.numMethods = numMethodsInFile;
        fileComplexity.complexityPerMethod = complexityForFile / numMethodsInFile
    }
});

var complexitySummary = {
    numMethodsWithHighComplexity: numMethodsWithHighComplexity,
    maxComplexity: maxComplexity,
    totalComplexity: totalComplexity,
    numMethods: totalNumMethods,
    complexityPerMethod: totalComplexity / totalNumMethods,
    methodsPerFile: totalNumMethods / fileComplexities.length,
    details: fileComplexities
}

console.log(JSON.stringify(complexitySummary));