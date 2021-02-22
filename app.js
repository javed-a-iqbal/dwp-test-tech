const express = require("express");
const app = express();
require('dotenv').config()
const usersRoutes = require('./routers/routes');
const PORT = process.env.PORT || '3000'

const helmet = require('helmet')
const a=require('./logger/logger')
const successLog = require('./logger/logger').successLog;
const errorLog = require('./logger/logger').errorLog;

app.use('/users', usersRoutes);
app.use(helmet());


const server = app.listen(process.env.PORT || 3000, process.env.IP, function (error) {
    if (error) {
      errorLog.error("Unable to listen for connections ", error);
      process.exit(10);
    } else {
      const host = server.address().address;
      const port = server.address().port;
      successLog.info(`People find  with given miles Portal App listening at http://${host}:${port}`, { host: host, port: port });
     
    }
  });

module.exports = app;
