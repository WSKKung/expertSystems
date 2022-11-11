import { WebhookClient } from "dialogflow-fulfillment"

// Accept fulfillment request from Dialogflow
export function fullfillmentRequest(req, res) {
	let agent = new WebhookClient({ request: req, response: res })
	let intentMap = new Map()
	intentMap.set("Rude word", rudeWord)
	intentMap.set("แนะนำข้าว", suggestRice)
	agent.handleRequest(intentMap)
	
}

// Intent handlers
function rudeWord(agent) {
	agent.add("Voraphat")
}

function suggestRice(agent) {
	agent.add(agent.consoleMessages)
}