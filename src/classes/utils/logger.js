module.exports = function() {
    return {
        info: function(info) {
            console.log("INFO", info);
        },
        warn: function(warning) {
            console.log("WARN", warning);
        }
    }
}