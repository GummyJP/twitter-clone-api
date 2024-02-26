import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize({
  // Database connection options retrieved from environment variables
  host: process.env.DB_HOST, // Hostname of the database server
  username: process.env.DB_USER, // Username for database authentication
  password: process.env.DB_PASSWORD, // Password for database authentication
  database: process.env.DB_NAME, // Name of the database to connect to
  dialect: 'mysql', // Dialect of the database server (MySQL in this case)
  logging: false, // Disable logging of SQL queries
});

export default sequelize;
