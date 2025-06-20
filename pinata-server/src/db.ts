// db.ts
import * as mysql from 'mysql2/promise'
import { config } from 'dotenv'

config()

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 4000,
  waitForConnections: true,
  connectionLimit: 5,
  ssl: {
    rejectUnauthorized: true,
  },
})
