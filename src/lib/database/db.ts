import { Kysely, MysqlDialect } from 'kysely'
import { type Pool, createPool } from 'mysql2'

import { type Database } from './types'

export const pool: Pool = createPool({
  database: process.env.DB_DATABASE ?? 'db',
  host: process.env.DB_HOST ?? 'localhost',
  user: process.env.DB_USER ?? 'user',
  password: process.env.DB_PASSWORD ?? 'password',
  port: Number(process.env.DB_PORT) ?? 3306,
  connectionLimit: 10,
})

const dialect = new MysqlDialect({
  pool,
})

export const db = new Kysely<Database>({
  dialect,
})
