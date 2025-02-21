const express = require('express');
const cors = require('cors');
const routes = require('./src/routes')

const app = express();
app.use(cors());
app.use(express.json());


// Routes
app.use('/', routes);


module.exports = app;