const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

sequelize.sync({ force: false })  // Change force: true to drop & recreate the table on every run
  .then(() => {
    console.log('MySQL Database synced...');
  })
  .catch((error) => {
    console.error('Unable to sync the database:', error);
  });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
