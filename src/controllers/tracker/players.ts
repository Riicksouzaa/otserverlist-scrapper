import socket_connection from "../../utils/socket_connection";
import outputMessage from "../../utils/outputMessage";

export default class playerTracker extends socket_connection {

    constructor(ip: string, port: number) {
        const buffer = Buffer.from([6, 0, 255, 1, 32, 0, 0, 0]);
        super(ip, port, buffer)
    }

    async endSocket() {
        this.client.on('end', async () => {
            this.playerList()
        })
    }

    async playerList() {
        const message = new outputMessage(this.message)
        message.getU16()
        let arr = {}
        const firstByte = message.getByte()
        if (firstByte == 33) {
            const playersCount = message.getU32()
            for (var i = 0; i < playersCount; i++) {
                let playerName = message.getString()
                let playerLevel = message.getU32()
                if (playerName != '' && playerLevel != undefined) {
                    arr = { srv: this.ip, name: playerName, level: playerLevel }
                }
            }
        }
    }

}