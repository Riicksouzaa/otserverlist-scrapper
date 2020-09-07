import Agenda from "agenda"
import serverTracker from "../controllers/tracker/server"
import db from "../database/connection"
import databaseconfig from "../../config/database_config"
import log from "../utils/logs"


export default class AgendaTasks {



    private task = new Agenda({
        db: databaseconfig.mongodb,
        processEvery: '*/1 * * * *'
    })


    async NewServerTask() {
        this.task.name("GetServerDataFromServerThatNotBeenTaked")

        this.task.define('catchServerNotCatcher', async job => {
            log.info("TASK catchServerNotCatcher Iniciada...")
            try {
                const socketNotTaked = await db('serversockets').select('*').whereRaw('`serversockets`.`id` not in (select `socket_id` from `servers`) and `serversockets`.`failtries` <= 5')
                socketNotTaked.forEach((value) => {
                    new serverTracker(value.urlsocket, value.portsocket)
                })
            } catch (e) {
                log.error(e)
            }
        })

        await this.task.start()
        log.info("TASK catchServerNotCatcher Startada...")

        await this.task.every('*/10 * * * *', 'catchServerNotCatcher')

    }

    async ServerTask() {



        this.task.name("ServerDataCatcher")

        this.task.define('serverCatch', async job => {
            try {
                const socket = await db('serversockets').select('*')
                socket.forEach((value, index) => {
                    new serverTracker(value.urlsocket, value.portsocket)
                })
            } catch (e) {
                log.error(e)
            }
        })
        await this.task.start();
        await this.task.every('*/30 * * * *', 'serverCatch')
    }
}