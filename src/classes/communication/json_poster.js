module.exports = function(http, json) {
    return {
        postJSON: function(host, path, port, jsonObject, onSuccess) {
            var jsonString = json.stringify(jsonObject);
            var headers = {
                'Content-Type': 'application/json',
                'Content-Length': jsonString.length
            };

            var options = {
                host: host,
                port: port,
                path: path,
                method: 'POST',
                headers: headers
            };

            var req = http.request(options, function(res) {
                res.setEncoding('utf-8');
                var responseString = '';
                res.on('data', function(data) {
                    responseString += data;
                });
                res.on('end', function() {
                    var resultObject = json.parse(responseString);
                    onSuccess(resultObject);
                });
            });

            req.on('error', function(e) {
                throw e;
            });

            req.write(jsonString);
            req.end();
        }
    }
}