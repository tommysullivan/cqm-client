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
    JSONPoster,
    Collection
    ) {
    return {
        process: function() {
            return Process(this.nativeProcess(), this);
        },
        nativeProcess: function() {
            return nativeProcess;
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
        collection: function(elementArray) {
            return Collection(elementArray);
        },
        emptyCollection: function() {
            return this.collection([]);
        },
        logger: Logger,
        jsonFileLoaderException: JSONFileLoaderException,
        undefinedProcessArgumentException: UndefinedProcessArgumentException
    }
}