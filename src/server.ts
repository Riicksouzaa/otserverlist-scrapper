import AgendaTasks from "./tasks/agenda"
import ParseHtmlFromOtlist from "./utils/html/parsehtml"

const parseHtml = new ParseHtmlFromOtlist()
parseHtml.euViGnomos()

const task = new AgendaTasks()
task.ServerTask()
task.NewServerTask()
