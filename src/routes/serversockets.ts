import express from "express"
import ServerSockets from "../controllers/serversockets"

const serverSocketsRoute = express.Router()
const serverSocket = new ServerSockets()

serverSocketsRoute.get('/', serverSocket.index)
serverSocketsRoute.post('/', serverSocket.create)

export default serverSocketsRoute
