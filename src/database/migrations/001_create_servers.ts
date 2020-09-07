import Knex from "knex"

export async function up(knex: Knex) {
    return knex.schema.createTable('servers', table => {
        table.increments('id').primary()
        table.integer('socket_id').unsigned().notNullable().references('id').inTable('serversockets').onDelete('CASCADE').onUpdate('CASCADE')

        table.string('url').notNullable()
        table.string('ip').notNullable()
        table.string('servername').notNullable()
        table.integer('uptime').notNullable().defaultTo(0)
        table.integer('port').notNullable().defaultTo(7171)
        table.string('location').notNullable()
        table.string('server').notNullable()
        table.string('version').notNullable()
        table.string('client').nullable()
        table.timestamps(true, true)

    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('servers')
}