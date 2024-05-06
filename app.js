const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./config/config');
const rateLimit = require('express-rate-limit');
const logger = require('./logging/logger');
const connectToDb = require('./db/mongoDb');
const bookRouter = require('./routes/books.route');
const authorRouter = require('./routes/authors.route');

const app = express();

// Conncet to MongoDB Database
connectToDb();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

// Add Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Limiter middleware
app.use(limiter);

// Security middleware
app.use(helmet());

// Route declaration
app.get('/', (req, res) => {
  res.send('Welcome to your number 1 Bookstore');
});
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/authors', authorRouter);

app.use((err, req, res, next) => {
  logger.error(err.message);
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    error: message,
    statusCode,
  });
});

app.listen(config.PORT, () => {
  logger.info(`Servier started at http://localhost:${config.PORT}`);
});
