const mongoose = require('mongoose');
const config = require('../config/config');
const logger = require('../logging/logger');

const connectToDb = () => {
  mongoose.connect(config.DB_URL);

  mongoose.connection.on('connected', () => {
    logger.info('Mongodb connected successfully');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(error);
  });
};

module.exports = connectToDb;
