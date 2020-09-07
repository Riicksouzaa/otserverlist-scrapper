import express from "express"
import Servers from "../controllers/Servers"

const serversRoute = express.Router()
const servers = new Servers()

serversRoute.get('/', servers.index)

export default serversRoute
