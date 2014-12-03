var fs = require('fs'),
    nativeProcess = process,
    http = require('http'),
    Process = require('../classes/utils/process'),
    //JSON,
    JSONFileLoader = require('../classes/utils/json_file_loader'),
    Logger = require('../classes/utils/logger'),
    JSONFileLoaderException = require('../classes/utils/json_file_loader_exception'),
    UndefinedProcessArgumentException = require('../classes/utils/undefined_process_argument_exception'),
    JSONPoster = require('../classes/utils/json_poster'),
    UtilsFactory = require('../classes/utils/utils_factory');

module.exports = UtilsFactory(
    fs,
    nativeProcess,
    http,
    Process,
    JSON,
    JSONFileLoader,
    Logger,
    JSONFileLoaderException,
    UndefinedProcessArgumentException,
    JSONPoster
)