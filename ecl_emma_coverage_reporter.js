//GROUP,PACKAGE,CLASS,INSTRUCTION_MISSED,INSTRUCTION_COVERED,BRANCH_MISSED,BRANCH_COVERED,LINE_MISSED,LINE_COVERED,COMPLEXITY_MISSED,COMPLEXITY_COVERED,METHOD_MISSED,METHOD_COVERED
//"test (Nov 24, 2014 6:06:21 PM)/security/src",com.lookout.android.apk.heuristic,KnownFileHeuristic,20,41,2,6,6,13,2,5,0,3

var fs = require('fs');

var coverageCSVFilePath = process.argv[2];
if(coverageCSVFilePath==null) throw new Error("usage: node ecl_emma_coverage_reporter path/to/coverage/file.csv");

var coverageCSVFileContent = fs.readFileSync(coverageCSVFilePath).toString();
var coverageFileLines = coverageCSVFileContent.split("\n");

var packageNameIndex = 2;
var classNameIndex = 3;
var instructionMissedIndex = 4;
var instructionCoveredIndex = 5;
var branchMissedIndex = 6;
var branchCoveredIndex = 7;
var lineMissedIndex = 8;
var lineCoveredIndex = 9;
var complexityMissedIndex = 10;
var complexityCoveredIndex = 11;
var methodMissedIndex = 12;
var methodCoveredIndex = 13;

function getRidOfColumnHeaders() {
    coverageFileLines.shift();
}
getRidOfColumnHeaders();

function transformResult(missed, covered) {
    var total = covered + missed;
    return {
        percent: total==0 ? 0 : covered / total,
        covered: covered,
        total: total,
        notCovered: missed
    }
}

var classResults = []
coverageFileLines.forEach(function(line) {
    var columns = line.split(',');
    var fqn = columns[packageNameIndex]+'.'+columns[classNameIndex];

    if(columns.length < 12) return;

    var parsedResult = {
        instructionMissed: parseInt(columns[instructionMissedIndex]),
        instructionCovered: parseInt(columns[instructionCoveredIndex]),
        branchMissed: parseInt(columns[branchMissedIndex]),
        branchCovered: parseInt(columns[branchCoveredIndex]),
        lineMissed: parseInt(columns[lineMissedIndex]),
        lineCovered: parseInt(columns[lineCoveredIndex]),
        complexityMissed: parseInt(columns[complexityMissedIndex]),
        complexityCovered: parseInt(columns[complexityCoveredIndex]),
        methodMissed: parseInt(columns[methodMissedIndex]),
        methodCovered: parseInt(columns[methodCoveredIndex])
    }

    var statements = transformResult(parsedResult.instructionMissed, parsedResult.instructionCovered);
    var branches = transformResult(parsedResult.branchMissed, parsedResult.branchCovered);
    var functions = transformResult(parsedResult.methodMissed, parsedResult.methodCovered);
    var lines = transformResult(parsedResult.lineMissed, parsedResult.lineCovered);
    var statements = transformResult(parsedResult.instructionMissed, parsedResult.instructionCovered);

    var classResult = {
        fqn: fqn,
        statements: statements,
        branches: branches,
        functions: functions,
        lines: lines
    }

    classResults.push(classResult);
});

var subResultProps = ['statements','branches','functions','lines'];

var coverageResult = {
    details: classResults
}

subResultProps.forEach(function(subResultProp) {
    coverageResult[subResultProp] = transformResult(0, 0);
});

function addClassResultToTotal(totalSubResult, classSubResult) {
    totalSubResult.covered += classSubResult.covered;
    totalSubResult.notCovered += classSubResult.notCovered;
    totalSubResult.total += classSubResult.total;
}

classResults.forEach(function(classResult) {
    subResultProps.forEach(function(subResultProp) {
        addClassResultToTotal(coverageResult[subResultProp], classResult[subResultProp]);
    });
});

subResultProps.forEach(function(subResultProp) {
    coverageResult[subResultProp].percent = coverageResult[subResultProp].covered / coverageResult[subResultProp].total;
});

console.log(JSON.stringify(coverageResult));

//TODO: Cyclomatic complexity
//totalComplexity
//numMethods
//complexityPerMethod
//numClassesWithHighComplexity