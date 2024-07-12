import { type Kysely, sql } from 'kysely'

import { type Database } from '@/lib/database/types'

export const up = async (db: Kysely<Database>): Promise<void> => {
  try {
    await db.schema
      .createTable('user')
      .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
      .addColumn('name', 'varchar(255)', (col) => col.notNull())
      .addColumn('email', 'varchar(255)', (col) => col.unique().notNull())
      .addColumn('created_at', 'timestamp', (col) =>
        col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
      )
      .execute()
    console.log("Table 'user' created successfully")
  } catch (error) {
    console.error("Failed to create table 'user':", error)
  }
}

export const down = async (db: Kysely<Database>): Promise<void> => {
  try {
    await db.schema.dropTable('user').execute()
    console.log("Table 'user' dropped successfully")
  } catch (error) {
    console.error("Failed to drop table 'user':", error)
  }
}
