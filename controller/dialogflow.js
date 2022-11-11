import { WebhookClient } from "dialogflow-fulfillment"
import { area } from "../expert_system/variables.js"
import { getRiceBreedSuggestion } from "../expert_system/expert_system.js"

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
	agent.add(agent.consoleMessages)
}

function suggestRice(agent) {
  
  let params = agent.parameters

  console.log(params)
  
  // default to DialogFlow console messages if strictly required params are missing
  if (!params.riceType || !params.province || !params.season || !params.riceArea ) {
    agent.add(agent.consoleMessages)
    return
  }

  // rain frequency can be ignored on the following area
  if ( [ area.irrigatedLowland, area.floating, area.deepwater ].includes(params.riceArea) ) {
    let factor = {
      riceType: params.riceType,
      province: params.province,
      inSeason: params.season,
      area: params.riceArea
    }
    let suggestionResults = getRiceBreedSuggestion(factor)
    agent.add(suggestionResults.map(rice => rice.name).join(', '))
    clearAgentContexts(agent)
    return 
  }

  if (params.rainFrequency) {
    let factor = {
      riceType: params.riceType,
      province: params.province,
      inSeason: params.season,
      area: params.riceArea,
      rainFrequency: params.rainFrequency
    }
    let suggestionResults = getRiceBreedSuggestion(factor)
    agent.add(suggestionResults.map(rice => rice.name).join(', '))
    clearAgentContexts(agent)
    return
  }
  
  agent.add(agent.consoleMessages)
	
}

function clearAgentContexts(agent) {
    for (let ctx of agent.context) {
      agent.context.delete(ctx.name)
    }
}