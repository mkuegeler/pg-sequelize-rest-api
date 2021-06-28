import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const db:string = String(process.env.DB_DATABASE);
const user:string = String(process.env.DB_USERNAME);
const password:string = String(process.env.DB_PASSWORD);
const host:string = String(process.env.DB_HOST);

const sequelize = new Sequelize(db, user, password, {
    host: host,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });

  export default sequelize;