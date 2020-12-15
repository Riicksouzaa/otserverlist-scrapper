import knex from "knex"
import databaseConfig from "../../config/database_config"

const db = knex(databaseConfig.mysql)

export default db