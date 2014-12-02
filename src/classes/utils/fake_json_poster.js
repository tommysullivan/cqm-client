module.exports = function(logger, json) {
    return {
        postJSON: function(host, path, port, jsonObject, onSuccess) {
            var message = [
                "FakeJSONPoster.postJSON was called with the following arguments:",
                'host:',
                host,
                'path:',
                path,
                'port:',
                port,
                'jsonObject:',
                json.stringify(jsonObject)
            ].join("\n");
            logger.info(message);
            onSuccess('fake status: {"status":200, "ok": true}');
        }
    }
}