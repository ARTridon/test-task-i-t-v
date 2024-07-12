import { MysqlAdapter, MysqlDriver, MysqlIntrospector, MysqlQueryCompiler } from 'kysely'
import { defineConfig } from 'kysely-ctl'

//kysely-ctl can not find the path from ts alias path
import { pool } from './src/lib/database/db'

export default defineConfig({
  dialect: {
    createAdapter() {
      return new MysqlAdapter()
    },
    createDriver() {
      return new MysqlDriver({ pool })
    },
    createIntrospector(db) {
      return new MysqlIntrospector(db)
    },
    createQueryCompiler() {
      return new MysqlQueryCompiler()
    },
  },
  migrations: {
    migrationFolder: 'src/lib/database/migrations',
  },
})
