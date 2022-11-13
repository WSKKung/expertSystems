import express from 'express'
import { join } from 'path'
import { router } from './routes/router.js'
import { publicFolder } from './util/path.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(router)

const port = 8081

// Expose public folder for any requests
app.use(express.static(publicFolder))

app.listen(port, () => {
  console.log(process.env.hostname)
  console.log(`listening on port http://localhost:${port}`)
})