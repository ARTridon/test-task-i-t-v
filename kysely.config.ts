import {
  DummyDriver,
  MysqlDriver,
  MysqlQueryCompiler,
  MysqlAdapter,
  MysqlIntrospector,
} from "kysely";
import { defineConfig } from "kysely-ctl";
import { pool } from "@/lib/database/db";

export default defineConfig({
  dialect: {
    createAdapter() {
      return new MysqlAdapter();
    },
    createDriver() {
      return new MysqlDriver({ pool });
    },
    createIntrospector(db) {
      return new MysqlIntrospector(db);
    },
    createQueryCompiler() {
      return new MysqlQueryCompiler();
    },
  },
  migrations: {
    migrationFolder: "src/lib/database/migrations",
  },
});
