import express from 'express'
import { router } from './routes/router.js'
import { publicFolder } from './util/path.js'

const app = express()

app.use(router)

const port = 8081

// Expose public folder for any requests
app.use(express.static(publicFolder))

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`)
})