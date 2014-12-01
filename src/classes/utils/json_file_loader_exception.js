module.exports = function(filePath, causeException) {
    var message = [
        "JSONFileLoaderException - problem loading / parsing json.",
        "filePath:",
        filePath,
        "caused by:",
        causeException.toString()
    ].join("n");
    return new Error(message);
}