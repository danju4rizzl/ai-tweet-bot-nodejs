import express from "express"
import { CronJob } from "cron"
import { translateAndPostNews } from "./services/index.js"

const app = express()
const port = 5000

// run the corn job every 6 hours
const job = new CronJob("* */6 * * *", translateAndPostNews())
job.start()

app.listen(port, () => {
	console.log(`Server is running on port ${port} 🥳`)
	job.running
		? console.log("🟢 CronJob is running")
		: console.log("🔴 CronJob is not running")
})
