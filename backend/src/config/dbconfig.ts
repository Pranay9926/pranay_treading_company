import { credentials } from './config';
import { Sequelize } from 'sequelize';

const { user, host, database, password, port } = credentials.development;

export const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });