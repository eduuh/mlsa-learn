const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

// Loads env vars
dotenv.config({ path: './config/config.env' });

//connection to database
connectDB();

// Route files
const bootcamp = require('./routes/bootcamp');
const register = require('./routes/auth');

const app = express();
app.use(express.json());
// Dev loging Middlerware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/bootcamps', bootcamp);
app.use('/api/v1/auth', register);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} node on port ${PORT}`.yellow.bold
  )
);

// Handle unhangdled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
