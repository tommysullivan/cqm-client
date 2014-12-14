module.exports = function(utilsFactory) {
    return {
        requestedTags: function() {
            return utilsFactory.collection(['coverage']);
        },
        requestedJobNames: function() {
            return utilsFactory.emptyCollection();
        },
        configurationFilePath: function() {
            return utilsFactory.process().argumentAtIndex(2);
        }
    }
}