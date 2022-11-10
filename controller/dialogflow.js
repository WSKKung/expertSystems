// Accept fulfillment request from Dialogflow
export function fullfillmentRequest(req, res) {
	let agent = new WebhookClient({ request: req, response: res })

	let intentMap = new Map()
	intentMap.set("Rude word", rudeWord)

	agent.handleRequest(intentMap)

}

// Intent handlers
function rudeWord(agent) {
	agent.add("Voraphat")
}