import db from "../database/connection"
import log from "../utils/logs"

export default class Servers {


    async searchError(urlsocket: string) {
        try {
            await db('serversockets').where('urlsocket', '=', urlsocket).increment('failtries', 1)
            log.error(`Houve uma falha ao tentar adicionar o server ${urlsocket}, provavelmente o socket não respondeu em tempo hábil`)
        } catch (e) {
            log.error(e)
        }
    }

    async create(urlsocket: string, serverinfo: any) {
        const {
            uptime,
            ip,
            servername,
            port,
            location,
            url,
            server,
            version,
            client
        } = serverinfo



        const trx = await db.transaction()
        try {

            await trx('serversockets').where("urlsocket", '=', urlsocket).first('id').then(async (row) => {
                await trx('servers').insert({
                    socket_id: row.id,
                    uptime,
                    ip,
                    servername,
                    port,
                    location,
                    url,
                    server,
                    version,
                    client
                })
                await trx.commit()
            })

            await trx.commit()
            log.info(`server ${servername} adicionado com sucesso ao banco de dados`)
        } catch (e) {
            if (e.errno == 19 || e.code == 'ER_DUP_ENTRY') {
                try {
                    await trx('servers').where('servername', '=', servername).update({
                        uptime,
                        ip,
                        servername,
                        port,
                        location,
                        url,
                        server,
                        version,
                        client,
                        updated_at: trx.raw(`now()`)
                    })
                    await trx.commit()
                    log.info(`server ${servername} atualizado com sucesso`)
                } catch (e) {
                    await trx.rollback()
                    log.error(`Ocorreu um erro ao fazer update do server ${servername}: ${e} `)
                }
            } else {
                await trx.rollback()
                log.error(`Ocorreu um erro não catalogado ao inserir o server ${servername}:`, e)
            }
        }
    }
}