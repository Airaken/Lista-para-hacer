const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use(require('./router/index'));

app.listen(3000, () => {
    console.log('Listen on port 3000');
});