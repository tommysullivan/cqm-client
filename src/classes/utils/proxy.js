module.exports = function() {
    return {
        setProxiedObject: function(proxiedObject) {
            delete this.setProxiedObject;
            for(var methodName in proxiedObject) {
                this[methodName]=function() {
                    return proxiedObject[methodName].apply(proxiedObject, arguments);
                }
            }
        }
    }
}