module.exports = function(argumentIndex) {
    return new Error("UndefinedProcessArgumentException. Process does not have argument at the requested index: "+argumentIndex);
}