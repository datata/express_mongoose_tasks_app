const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const tasks = require('./routes/task.routes');

const app = express();
const { mongoose } = require('./config/database');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', require('./routes/user.routes'));
app.use('/api', tasks);


app.listen(port, () => {
  console.log('Server is running on port: ' + port);
}); 