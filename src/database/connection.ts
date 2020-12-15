import knex from "knex"
import databaseConfig from "../../config/database_config"

const db = knex(databaseConfig.sqlite)

export default db