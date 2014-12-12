module.exports = function(total, covered,  notCovered) {
    var message = [
        'InvalidCoverageNumbersException - the numbers reported did not add correctly or did not make sense',
        'total',
        total,
        'covered',
        covered,
        'notCovered',
        notCovered
    ].join("\n");
    return new Error(message);
}