const express = require('express');
const app = express();
//adds routers
app.use(require('./login'));
app.use(require('./usuario'));
app.use(require('./tarea'));
// exportes routers
module.exports = app;