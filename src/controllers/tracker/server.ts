import socket_connection from "../../utils/socket_connection";
import parser from "fast-xml-parser"
import Servers from "../Servers";

export default class serverTracker extends socket_connection {
    constructor(ip: string, port: number) {
        let buffer = Buffer.from([6, 0, 255, 255, 0, 0, 0, 0]);
        const infoArray = Buffer.from("info", "utf-8");

        for (let i = 0; i < infoArray.length; i++) {
            buffer[i + 4] = infoArray[i];
        }
        super(ip, port, buffer)
    }

    protected async onError() {
        const servers = new Servers()
        this.client.on('error', async (e) => {
            await servers.searchError(this.ip)
            this.error = true
            this.client.end()
        })
    }

    protected async endSocket() {

        if (!this.error) {
            const servers = new Servers()
            var options = {
                attributeNamePrefix: "",
                attrNodeName: "", //default is 'false'
                textNodeName: "#text",
                ignoreAttributes: false,
                ignoreNameSpace: true,
                allowBooleanAttributes: true,
                parseNodeValue: true,
                parseAttributeValue: true,
                trimValues: true,
                decodeHTMLchar: true,
                cdataTagName: "__cdata", //default is 'false'
                cdataPositionChar: "\\c",
            };

            this.client.on('end', async () => {
                let xmlData = this.message.toString()
                if (parser.validate(xmlData) === true) {//optional
                    var jsonObj = parser.parse(xmlData, options);
                    await servers.create(this.ip, jsonObj.tsqp.serverinfo)
                }
            })
        }
    }
}