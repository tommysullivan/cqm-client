module.exports = function(fs, json, factory) {
    return {
        loadJSONFile: function(filePath) {
            try {
                return json.parse(fs.readFileSync(filePath).toString());
            }
            catch(e) {
                throw factory.jsonFileLoaderException(filePath, e);
            }
        }
    }
}