import Knex from "knex"

export async function up(knex: Knex) {
    return knex.schema.createTable('serversockets', table => {
        table.increments('id').primary()
        table.string('urlsocket').notNullable().unique()
        table.integer('portsocket').notNullable()
        table.integer('failtries').notNullable().defaultTo(0)
        table.timestamps(true, true)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('serversockets')
}