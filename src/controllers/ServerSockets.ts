import { Request, Response } from "express"
import db from "../database/connection"
import log from "../utils/logs"

export default class ServerSockets {

    async index(req: Request, resp: Response) {
        try {
            const socket = await db('serversockets').select('*')
            return resp.status(200).json(socket)
        } catch (e) {
            log.error(e)
            return resp.status(401).json(e)
        }
    }

    async create(req: Request, resp: Response) {
        const {
            urlsocket,
            portsocket
        } = req.body

        const trx = await db.transaction()
        try {
            await trx('serversockets').insert({
                urlsocket,
                portsocket
            })
            await trx.commit()
            return resp.status(201).send()
        } catch (e) {
            log.error(e)
            await trx.rollback()
            return resp.status(401).json(e)
        }
    }
}