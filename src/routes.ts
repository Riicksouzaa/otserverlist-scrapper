import express from "express"
import serverSocketsRoute from "./routes/serversockets"
import serversRoute from "./routes/servers"

const routes = express.Router()
routes.use('/serversockets', serverSocketsRoute)
routes.use('/servers', serversRoute)


export default routes