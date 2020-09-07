import { Socket } from "net"
import log from "../utils/logs"

export default class socket_connection {


    protected client = new Socket()
    protected index = 0
    protected message = Buffer.allocUnsafe(65535 * 25)
    protected ip = ''
    protected error = false

    constructor(ip: string, port: number, buffer: Buffer) {
        this.ip = ip

        this.socketConnect(ip, port, buffer)
    }

    protected async socketConnect(ip: string, port: number, buffer: Buffer) {
        try {
            this.client.connect(port, ip, () => {
                this.client.setTimeout(5, () => {
                    this.error = true
                    this.client.end()
                })
            })

            this.client.on('connect', () => {
                this.client.write(buffer)
            })

            this.client.on('data', (data) => {
                for (var i = 0; i < data.length; i++) {
                    this.message[this.index++] = data[i];
                }
            })
            this.onError()
            this.endSocket()
        }
        catch (e) {
            log.error(e)
        }
    }

    protected onError() {
        this.client.on('error', (e) => {
            log.error(`houve um erro pesquisar dados do server ${this.ip}`)
            this.client.end()
        })
    }

    protected endSocket() {
        this.client.on('end', async () => {
            log.info("ended")
        })
    }

}