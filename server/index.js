require('./config/config');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '../public')));


// add the request of server
app.use(require('./router/index'));


app.listen(process.env.PORT, () => {
    console.log('Listen on port ', process.env.PORT);
});