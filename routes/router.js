import { Router, json } from "express";
import { fullfillmentRequest } from "../controller/dialogflow/webhook.js";
const router = Router()
  
router.post('/api/dialogflow', json(), fullfillmentRequest)

export {
	router
}