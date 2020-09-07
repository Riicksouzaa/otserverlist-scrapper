import express from "express"
import routes from "./routes"
import cors from "cors"
import AgendaTasks from "./tasks/agenda"
import ParseHtmlFromOtlist from "./utils/html/parsehtml"

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const parseHtml = new ParseHtmlFromOtlist()
parseHtml.euViGnomos()

const task = new AgendaTasks()
task.ServerTask()
task.NewServerTask()

app.listen(process.env.PORT || 3333)
