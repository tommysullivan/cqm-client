var JSONFileLoader = require('../../../src/classes/utils/json_file_loader');

describe('JSONFileLoader(fs, json)', function() {
    var subject, fs, json, filePath, fileContents;

    beforeEach(function() {
        filePath = 'filePath';
        fs = jasmine.createSpyObj('fs', ['readFileSync']);
        json = jasmine.createSpyObj('JSON', ['parse']);
        fileContents = 'fileContents';
        fs.readFileSync.andReturn(fileContents);
        subject = JSONFileLoader(fs, json);
    });

    it('constructs instances of JSONFileLoader which can read and parse a JSON file in a single call', function() {
        expect(subject).not.toBeUndefined();
    });

    describe('loadJSONFile(filePath)', function() {
        it('uses fs to synchronously read the file located at filePath into a string', function() {
            subject.loadJSONFile(filePath);
            expect(fs.readFileSync).toHaveBeenCalledWith(filePath);
        });
        it('uses json.parse to parse the string containing the file contents', function() {
            subject.loadJSONFile(filePath);
            expect(json.parse).toHaveBeenCalledWith(fileContents);
        });
        it('returns the resulting JSON object to the caller', function() {
            var jsonResult = {}
            json.parse.andReturn(jsonResult);
            expect(subject.loadJSONFile(filePath)).toBe(jsonResult);
        });
    });
});