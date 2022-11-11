import { WebhookClient } from "dialogflow-fulfillment"
import { area } from "./../../expert_system/variables.js"
import { getRiceBreedSuggestion } from "../../expert_system/expert_system.js"
import { context, contextParams, intent } from "./constants.js"

/**
 * Accept fulfillment request from Dialogflow.
 * @param {Request} req A Dialogflow request object
 * @param {Response} res A Dialogflow response obkect
 */
export function fullfillmentRequest(req, res) {
  let agent = new WebhookClient({ request: req, response: res })
  let intentMap = new Map()
  intentMap.set(intent.riceSuggest, handleSuggestionInput)
  intentMap.set(intent.riceSuggest_inputPest, handleSuggestionPestInput)
  intentMap.set(intent.riceSuggest_inputDisease, handleSuggestionDiseaseInput)
  intentMap.set(intent.riceSuggest_inputDisease_confirm, finallyGetRiceSuggestion)
  agent.handleRequest(intentMap)
}

/**
 * Handles user single input flow during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
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
    agent.context.set(context.recommending, 10, params)
    agent.context.set(context.inputPest, 2, params)
    agent.add("")
    return
  }

  // fallback to Dialogflow console default
  agent.add("")

}

/**
 * Handles user list input of rice pests during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionPestInput(agent) {

  let params = agent.parameters
  let inputPest = params[contextParams.inputPest]
  let curRicePests = params[contextParams.pests] || []
  
  // need to increase lifetime
  // because some reason the final context did not shown in the response without it
  if (!params.curRicePests.includes(inputPest)) {
    for (let ctx of agent.context) {
      ctx.lifetime += 1
      ctx.parameters[contextParams.pests] = curRicePests.concat(inputPest)
    }
  }
  
  agent.add("")

}

/**
 * Handles user list input of rice disease during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionDiseaseInput(agent) {

  let params = agent.parameters
  let inputDisease = params[contextParams.diseases] 
  let curRiceDiseases = params[contextParams.diseases] || []
  
  // need to increase lifetime
  // because some reason the final context did not shown in the response without it
  if (!params.curRiceDiseases.includes(inputDisease)) {
    for (let ctx of agent.context) {
      ctx.lifetime += 1
      ctx.parameters[contextParams.diseases] = curRiceDiseases.concat(inputDisease)
    }
  }
  
  agent.add("")
  
}

/**
 * Endpoint for receiving all user inputs and give a rice suggestion to user
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function finallyGetRiceSuggestion(agent) {

  let recommendingCtx = agent.context.get("recommending")
  let recommendParams = recommendingCtx.parameters

  let factor = {
    riceType: recommendParams[contextParams.riceType],
    province: recommendParams[contextParams.province],
    inSeason: recommendParams[contextParams.inSeason],
    area: recommendParams[contextParams.area],
    rainFrequency: recommendParams[contextParams.rainFrequency],
    pests: recommendParams[contextParams.pests],
    diseases: recommendParams[contextParams.diseases]
  }

  let riceSuggestions = getRiceBreedSuggestion(factor)
  agent.add(riceSuggestions.map(rice => rice.name).join(", "))

}

/**
 * Utility function for clearing all contexts from an agent
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function clearAgentContexts(agent) {
  for (let ctx of agent.context) {
    agent.context.delete(ctx.name)
  }
}