
const express = require('express');

const app = express();
app.use(express.json());

const businessEntryController = require('./controllers/businessEntry');

app.use(businessEntryController);

app.listen(8000);

module.exports = app;