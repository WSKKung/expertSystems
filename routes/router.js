import { Router } from "express";
import { fullfillmentRequest } from "../controller/dialogflow";
const router = Router()

router.get('/', (req, res) => {
	res.status(200).send("Hello World!")
})
  
router.post('/api/dialogflow', express.json(), fullfillmentRequest)

export {
	router
}