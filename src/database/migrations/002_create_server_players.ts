import Knex from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('server_players', table => {
        table.increments('id').primary()
        table.integer('server_id').unsigned().notNullable().references('id').inTable('servers').onDelete('CASCADE').onUpdate('CASCADE')

        table.string('name').notNullable()
        table.integer('level').notNullable()

        table.timestamps(true, true)
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('server_players')
}