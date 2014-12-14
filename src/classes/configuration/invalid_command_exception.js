module.exports = function(causeException) {
    var message = [
        'InvalidCommandException. Usage: node cqm-client "path/to/config/file.json"',
        "caused by:",
        causeException.toString()
    ].join("\n");
    return new Error(message);
}