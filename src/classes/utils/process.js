module.exports = function(nativeProcess, factory) {
    return {
        argumentAtIndex: function(argumentIndex) {
            if(nativeProcess.argv[argumentIndex]==undefined) throw factory.undefinedProcessArgumentException(argumentIndex);
            return nativeProcess.argv[argumentIndex];
        }
    }
}