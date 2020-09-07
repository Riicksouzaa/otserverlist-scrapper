import knex from "knex"
import databaseconfig from "../../config/database_config"

const db = knex(databaseconfig.mysql)

export default db