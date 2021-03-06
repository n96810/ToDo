var winston = require("winston"),
fs = require("fs");

var env = process.env.NODE_ENV || "development";
var logDir = "log";

//Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var tsFormat = () => (new Date()).toLocaleTimeString();

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            "timestamp": tsFormat,
            "colorize": true,
            "level": env === "development" ? "verbose" : "info"
        }),
        new (winston.transports.File)({
            "filename": `${logDir}/results.log`,
            "timestamp": tsFormat,
            "level": env === "development" ? "verbose" : "info"
        }),
        new (require("winston-daily-rotate-file"))({
            "name": "logFile",
            "filename": `${logDir}/-results.log`,
            "timestamp": tsFormat,
            "datepattern": "yyyy-MM-dd",
            "prepend": true,
            "level": env === "development" ? "verbose" : "info"
        })
    ]
});

log = function(message, level)
{
    level = level || 'info';
    logger.log(level, message);
};

exports.log = log;