import express from 'express'
import { router } from './routes/router.js'
import { hostURL, publicFolder } from './util/path.js'
import cors from 'cors'

// init .env
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 8081

app.use(router)

// Expose public folder for any requests
app.use(express.static(publicFolder, { extensions: ['html', 'png'] }))
app.use(cors())

app.listen(port, () => {
  console.log(`listening on ${hostURL} at port ${port}`)
})