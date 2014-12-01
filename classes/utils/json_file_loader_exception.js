module.exports = function(filePath, causeException) {
    return {
        toString: function() {
            return [
                "JSONFileLoaderException - problem loading / parsing json.",
                "filePath:",
                filePath,
                "caused by:",
                causeException.toString()
            ].join("n");
        }
    }
}