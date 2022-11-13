import express from 'express'
import { join } from 'path'
import { router } from './routes/router.js'
import { publicFolder } from './util/path.js'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 8081

app.use(router)

// Expose public folder for any requests
app.use(express.static(publicFolder, { extensions: ['html', 'png'] }))
app.use(cors())

app.listen(port, () => {
  console.log(process.env.hostname)
  console.log(`listening on port http://localhost:${port}`)
})