import express from 'express'
import { router } from './routes/router.js'

const app = express()

app.use(router)

const port = 8081

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`)
})