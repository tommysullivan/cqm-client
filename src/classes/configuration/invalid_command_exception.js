module.exports = function(causeException) {
    var message = [
        "InvalidCommandException. Usage: node cqm-client -jobURL [jobURL] OR -configPath [configPath].",
        "caused by:",
        causeException.toString()
    ].join("\n");
    return new Error(message);
}