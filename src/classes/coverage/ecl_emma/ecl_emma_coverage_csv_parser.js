module.exports = function(eclEmmaCoverageConfig) {
    return {
        parseCSVIntoClassCoverageResults: function(eclEmmaCoverageCSVFileContent) {
            var coverageFileRows = this.getRows(eclEmmaCoverageCSVFileContent);
            this.getRidOfColumnHeaders(coverageFileRows);
            var rowsContainingMetrics = coverageFileRows.filter(this.isMetricRow, this);
            return rowsContainingMetrics.map(this.parseRow, this);
        },
        getRows: function(coverageCSVFileContent) {
            return coverageCSVFileContent.split(eclEmmaCoverageConfig.rowDelimiter);
        },
        getRidOfColumnHeaders: function(coverageFileRows) {
            coverageFileRows.shift();
        },
        getColumns: function(row) {
            return row.split(eclEmmaCoverageConfig.columnDelimiter);
        },
        isMetricRow: function(row) {
            return this.getColumns(row).length >= eclEmmaCoverageConfig.minNumberOfColumnsForRowToBeConsideredAMetricRow;
        },
        getFQN: function(columns) {
            return columns[eclEmmaCoverageConfig.packageNameIndex] + eclEmmaCoverageConfig.classAndPackageNameDelimiter + columns[eclEmmaCoverageConfig.classNameIndex];
        },
        parseRow: function(row) {
            var columns = this.getColumns(row);
            return {
                fqn: this.getFQN(columns),
                instructionMissed: parseInt(columns[eclEmmaCoverageConfig.instructionMissedIndex]),
                instructionCovered: parseInt(columns[eclEmmaCoverageConfig.instructionCoveredIndex]),
                branchMissed: parseInt(columns[eclEmmaCoverageConfig.branchMissedIndex]),
                branchCovered: parseInt(columns[eclEmmaCoverageConfig.branchCoveredIndex]),
                lineMissed: parseInt(columns[eclEmmaCoverageConfig.lineMissedIndex]),
                lineCovered: parseInt(columns[eclEmmaCoverageConfig.lineCoveredIndex]),
                complexityMissed: parseInt(columns[eclEmmaCoverageConfig.complexityMissedIndex]),
                complexityCovered: parseInt(columns[eclEmmaCoverageConfig.complexityCoveredIndex]),
                methodMissed: parseInt(columns[eclEmmaCoverageConfig.methodMissedIndex]),
                methodCovered: parseInt(columns[eclEmmaCoverageConfig.methodCoveredIndex])
            }
        }
    }
}