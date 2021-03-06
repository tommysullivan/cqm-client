module.exports = {
    istanbulSectionNamesOrderedByAppearance: ['statements','branches','functions','lines'],
    istanbulSectionHTMLSelector: '.metric',
    originalCoverageDataPropertyName: 'originalCoverageData',
    summarySectionName: 'summary',
    classesSectionName: 'classes',
    filesSectionName: 'files',
    linesSectionName: 'lines',
    eclEmmaCoverageConfig: {
        packageNameIndex: 2,
        classNameIndex: 3,
        instructionMissedIndex: 4,
        instructionCoveredIndex: 5,
        branchMissedIndex: 6,
        branchCoveredIndex: 7,
        lineMissedIndex: 8,
        lineCoveredIndex: 9,
        complexityMissedIndex: 10,
        complexityCoveredIndex: 11,
        methodMissedIndex: 12,
        methodCoveredIndex: 13,
        columnDelimiter: ",",
        rowDelimiter: "\n",
        minNumberOfColumnsForRowToBeConsideredAMetricRow: 12,
        classAndPackageNameDelimiter: '.'
    }
}