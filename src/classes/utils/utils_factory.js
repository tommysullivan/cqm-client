module.exports = function(
    fs,
    nativeProcess,
    http,
    Process,
    JSON,
    JSONFileLoader,
    Logger,
    JSONFileLoaderException,
    UndefinedProcessArgumentException,
    JSONPoster
    ) {
    return {
        process: function() {
            return Process(nativeProcess, this);
        },
        json: function() {
            return JSON;
        },
        jsonFileLoader: function() {
            return JSONFileLoader(fs, this.json(), this);
        },
        jsonPoster: function() {
            return JSONPoster(http, this.json());
        },
        logger: Logger,
        jsonFileLoaderException: JSONFileLoaderException,
        undefinedProcessArgumentException: UndefinedProcessArgumentException
    }
}