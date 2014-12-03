module.exports = function(host, path, port, coverageJSONObject, jsonPoster) {
    return {
        sendReport: function () {
            jsonPoster.postJSON(host, path, port, coverageJSONObject);
        }
    }
}