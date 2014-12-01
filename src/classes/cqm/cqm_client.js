module.exports = function(coverageReporter, coverageReportWriter, reportSender) {
    return {
        prepareAndSendReport: function() {
            coverageReporter.reportCoverage(coverageReportWriter);
            reportSender.sendReport();
        }
    }
}