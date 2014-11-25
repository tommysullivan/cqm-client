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

// http://nodejs.org/api.html#_child_processes
var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
child = exec("pwd", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});


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

//var coffeeSourceRoot = process.argv[2];
//var coffeeLintBinPath = process.argv[3]; //./node_modules/.bin/coffeelint
//if(coffeeSourceRoot==null || coffeeLintBinPath==null) throw new Error("usage: node cc-reporter path/to/coffee/src/root path/to/bin/coffeelint");


// ./node_modules/.bin/coffeelint -f coffeelint.json src/**/*.coffee src/*.coffee src/**/**/*.coffee src/**/**/**/*.coffee src/**/**/**/**/*.coffee