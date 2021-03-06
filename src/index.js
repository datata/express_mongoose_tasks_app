const express = require('express');
// const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');

const tasks = require('./routes/task.routes');

const app = express();
const { mongoose } = require('./config/database');

const port = process.env.PORT || 3000;
let corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  // methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  preflightContinue: false,
  // allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
  optionsSuccessStatus: 204
};

// app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

app.get('/', (req, res) => {
  return res.json({
    message: 'Welcome to the Task Manager API',
  });
});

app.use('/api', require('./routes/user.routes'));
app.use('/api', tasks);


app.listen(port, () => {
  console.log('Server is running on port: ' + port);
}); 