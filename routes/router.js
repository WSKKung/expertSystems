import { Router, json } from "express";
import { fullfillmentRequest } from "../controller/dialogflow/webhook.js";
const router = Router()

router.get('/', (req, res) => {
	res.status(200).send("Hello World!")
})
  
router.post('/api/dialogflow', json(), fullfillmentRequest)

export {
	router
}