import { WebhookClient } from "dialogflow-fulfillment"
import { area } from "../expert_system/variables.js"
import { getRiceBreedSuggestion } from "../expert_system/expert_system.js"

// Accept fulfillment request from Dialogflow
export function fullfillmentRequest(req, res) {
  let agent = new WebhookClient({ request: req, response: res })
  let intentMap = new Map()
  intentMap.set("Rude word", rudeWord)
  intentMap.set("แนะนำข้าว", handleSuggestionInput)
  intentMap.set("แนะนำข้าว - เลือกศัตรูพืช", handleSuggestionPestInput)
  intentMap.set("แนะนำข้าว - เลือกโรคพืช", handleSuggestionDiseaseInput)
  intentMap.set("แนะนำข้าว - เลือกโรคพืช - ยืนยัน", finallyGetRiceSuggestion)
  agent.handleRequest(intentMap)

}

// Intent handlers
function rudeWord(agent) {
  agent.add("")
}

function handleSuggestionInput(agent) {

  let params = agent.parameters

  // default to DialogFlow console messages if strictly required params are missing
  if (!params.riceType || !params.province || !params.season || !params.riceArea) {
    agent.add("")
    return
  }

  // rain frequency can be ignored on the following area, so we can skip to ask a pest
  if ([area.irrigatedLowland, area.floating, area.deepwater].includes(params.riceArea)) {
    // clear all contexts, including auto-generated one (from required fields)
    clearAgentContexts(agent)
    // and then set new one with given params
    agent.context.set('recommending', 10, params)
    agent.context.set('input-pest', 2, params)
    agent.add("")
    return
  }

  // fallback to Dialogflow console default
  agent.add("")

}

function handleSuggestionPestInput(agent) {

  let params = agent.parameters
  let curRicePests = params.curRicePests || []
  
  // need to increase lifetime
  // because some reason the final context did not shown in the response without it
  if (!params.curRicePests.includes(params.ricePest)) {
    for (let ctx of agent.context) {
      ctx.lifetime += 1
      ctx.parameters.curRicePests = curRicePests.concat(params.ricePest)
    }
  }
  
  agent.add("")

}

function handleSuggestionDiseaseInput(agent) {

  let params = agent.parameters
  let curRiceDiseases = params.curRiceDiseases || []
  
  // need to increase lifetime
  // because some reason the final context did not shown in the response without it
  if (!params.curRiceDiseases.includes(params.riceDisease)) {
    for (let ctx of agent.context) {
      ctx.lifetime += 1
      ctx.parameters.curRiceDiseases = curRiceDiseases.concat(params.riceDisease)
    }
  }
  
  agent.add("")
  
}

function finallyGetRiceSuggestion(agent) {
  let recommendingCtx = agent.context.get("recommending")
  let ctxParams = recommendingCtx.parameters
  let factor = {
    riceType: ctxParams.riceType,
    province: ctxParams.province,
    inSeason: ctxParams.season,
    area: ctxParams.riceArea,
    rainFrequency: ctxParams.rainFrequency,
    pests: ctxParams.curRicePests,
    diseases: ctxParams.curRiceDiseases
  }
  console.log(factor)
  let riceSuggestions = getRiceBreedSuggestion(factor)
  agent.add(riceSuggestions.map(rice => rice.name).join(", "))
}

function clearAgentContexts(agent) {
  for (let ctx of agent.context) {
    agent.context.delete(ctx.name)
  }
}