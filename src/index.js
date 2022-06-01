const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const { mongoose } = require('./config/database');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', require('./routes/user.routes'));

app.listen(port, () => {
  console.log('Server is running on port: ' + port);
}); 