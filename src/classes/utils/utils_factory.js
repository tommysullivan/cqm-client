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
    FakeJSONPoster
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
            return this.fakeJSONPoster();
            //return JSONPoster(http, this.json());
        },
        fakeJSONPoster: function() {
            return FakeJSONPoster(this.logger(), this.json());
        },
        logger: Logger,
        jsonFileLoaderException: JSONFileLoaderException,
        undefinedProcessArgumentException: UndefinedProcessArgumentException
    }
}