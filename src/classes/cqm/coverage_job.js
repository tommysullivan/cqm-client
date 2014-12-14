module.exports = function(coverageReporter, coverageReportWriter, reportSender) {
    return {
        execute: function() {
            coverageReporter.reportCoverage(coverageReportWriter);
            reportSender.sendReport();
        }
    }
}