module.exports = function(argumentIndex) {
    return {
        toString: function() {
            return "UndefinedProcessArgumentException. Process does not have argument at the requested index: "+argumentIndex;
        }
    }
}