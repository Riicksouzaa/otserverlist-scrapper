import { parse } from "node-html-parser"
import fs from "fs"
import path from "path"
import db from "../../database/connection"
import log from "../../utils/logs"

export default class ParseHtmlFromOtlist {

    async euViGnomos() {
        const file = fs.readFileSync(path.resolve(__dirname, 'lista.html'), 'utf-8')

        const htmlparsed = parse(file).querySelectorAll('.pl-15 a')

        htmlparsed.forEach(async (value) => {
            if (value != undefined) {

                value.childNodes.forEach(async (value) => {

                    try {
                        await db('serversockets').insert({
                            urlsocket: value.rawText,
                            portsocket: 7171
                        })
                        log.info(`server ${value.rawText} adicionado com sucesso à lista de sockets`)
                    } catch (e) {
                        if (e.code == 'ER_DUP_ENTRY') {
                            log.error(`server ${value.rawText} já existente`)
                        }
                    }
                })
            }
        })
    }
}

