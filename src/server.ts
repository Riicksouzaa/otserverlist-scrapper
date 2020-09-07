import express from "express"
import AgendaTasks from "./tasks/agenda"
import ParseHtmlFromOtlist from "./utils/html/parsehtml"

const parseHtml = new ParseHtmlFromOtlist()
const app = express()
parseHtml.euViGnomos()

const task = new AgendaTasks()
task.ServerTask()
task.NewServerTask()

app.listen(process.env.PORT || 3333)
