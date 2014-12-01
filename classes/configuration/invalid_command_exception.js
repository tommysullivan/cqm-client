module.exports = function(causeException) {
    return {
        toString: function() {
            return [
                "InvalidCommandException. Usage: node cqm-client -jobURL [jobURL] OR -configPath [configPath].",
                "caused by:",
                causeException.toString()
            ].join("\n");
        }
    }
}