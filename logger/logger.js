/*** Configurations of logger.*/
const winston = require('winston');
const { createLogger, format, transports } = require("winston")
const { combine, timestamp, prettyPrint } = format

const fs = require('fs');
const util = require('util');
var dateFormat = require('dateformat');
require('dotenv').config();
require('winston-daily-rotate-file');

const logDir = process.env.LOG_DIRECTORY;
let serviceName = process.env.SERVICE_NAME
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const myCustomLevels = {
  levels: {
    audit: 3
  }
};

var transport = new (winston.transports.DailyRotateFile)({
  filename: `${logDir}%DATE%-clericalnotifications.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: false,
  maxSize: '40m',
  maxFiles: '60d'
})

var auditTransport = new (winston.transports.DailyRotateFile)({
  filename: `${logDir}%DATE%-clericalnotifications-audit.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '60d'
})

function renameProperty(obj, oldName, newName) {
  obj[newName] = obj[oldName];
  delete obj[oldName];
}

var errorTransport = new (winston.transports.DailyRotateFile)({
  filename: `${logDir}%DATE%-clericalnotifications-error.log`,
  datePattern: 'DD-MM-YYYY',
  zippedArchive: false,
  maxSize: '40m',
  maxFiles: '60d'
})


const successLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    //format.json()
    format.printf(info => {
      renameProperty(info, "timestamp", "timeStamp")
      return ` ${info.level} ${JSON.stringify(info)}`

    })
  ),
  defaultMeta: { processIdentifier: serviceName },
  transports: [
    transport
  ]
});

if (process.env.NODE_ENV !== 'production') {
  successLogger.add(new winston.transports.Console());
}

const auditLogger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    //format.json()
    format.printf(info => {
      renameProperty(info, "timestamp", "timeStamp")
      return ` ${info.level} ${JSON.stringify(info)}`

    })
  ),
  defaultMeta: { processIdentifier: serviceName },
  transports: [
    auditTransport
  ],
});



if (process.env.NODE_ENV !== 'production') {
  auditLogger.add(new winston.transports.Console());
}

const errorLogger = winston.createLogger({
  level: 'error',
  format: format.combine(
    
    format.timestamp(),
      format.printf(info => {
      renameProperty(info, "timestamp", "timeStamp")
      return ` ${info.level} ${JSON.stringify(info)}`

    })
    
  ),
  defaultMeta: { processIdentifier: serviceName },
  transports: [
    errorTransport
  ]
});


if (process.env.NODE_ENV !== 'production') {
  errorLogger.add(new winston.transports.Console());
}


module.exports = {
  'successLog': successLogger,
  'errorLog': errorLogger,
  'auditLog': auditLogger
};
