const express = require('express');

const morgan = require('morgan');
const tourRouter = require('./Routes/tourRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

//third part middleware
app.use(morgan('dev'));

//builtin middleware
app.use(express.json());

//custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
