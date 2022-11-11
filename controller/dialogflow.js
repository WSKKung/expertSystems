import { WebhookClient } from "dialogflow-fulfillment"
import { area } from "../expert_system/variables.js"
import { getRiceBreedSuggestion } from "../expert_system/expert_system.js"

// Accept fulfillment request from Dialogflow
export function fullfillmentRequest(req, res) {
  let agent = new WebhookClient({ request: req, response: res })
  let intentMap = new Map()
  intentMap.set("Rude word", rudeWord)
  intentMap.set("แนะนำข้าว", suggestRice)
  intentMap.set("แนะนำข้าว - เลือกศัตรูพืช", handlePestInput)
  agent.handleRequest(intentMap)

}

// Intent handlers
function rudeWord(agent) {
  agent.add("")
}

function suggestRice(agent) {

  let params = agent.parameters

  // default to DialogFlow console messages if strictly required params are missing
  if (!params.riceType || !params.province || !params.season || !params.riceArea) {
    agent.add("")
    return
  }

  // rain frequency can be ignored on the following area
  if ([area.irrigatedLowland, area.floating, area.deepwater].includes(params.riceArea)) {
    let factor = {
      riceType: params.riceType,
      province: params.province,
      inSeason: params.season,
      area: params.riceArea
    }
    clearAgentContexts(agent)
    agent.context.set('recommending', 10, params)
    agent.context.set('input-pest', 2, params)
    agent.add("")
    return
  }

  // fallback to Dialogflow console default
  agent.add("")

}

function handlePestInput(agent) {
  let params = agent.parameters
  params.prevRicePests = params.curRicePests || []
  params.curRicePests = params.prevRicePests.concat(params.ricePest)
  /*
	agent.setFollowupEvent({
		name: "input-pest",
		parameters: params
	})*/
  for (let ctx of agent.context) {
    ctx.parameters.prevRicePest = params.prevRicePest
    ctx.parameters.curRicePests = params.curRicePests
  }

  console.log(agent.conv().contexts)
  console.log(agent.conv().contexts.output)
  agent.add("")
  
  agent.add("")
}

function clearAgentContexts(agent) {
  for (let ctx of agent.context) {
    agent.context.delete(ctx.name)
  }
}