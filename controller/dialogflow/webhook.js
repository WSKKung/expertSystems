import { WebhookClient } from "dialogflow-fulfillment"
import { getRiceBreedSuggestion, canInferWaterLevel } from "../../expert_system/expert_system.js"
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
  intentMap.set(intent.inputPestForSuggestion, handleSuggestionPestInput)
  intentMap.set(intent.confirmPestInputForSuggestion, pestInputFinished)
  intentMap.set(intent.inputDiseaseForSuggestion, handleSuggestionDiseaseInput)
  intentMap.set(intent.confirmSuggestion, finallyGetRiceSuggestion)
  agent.handleRequest(intentMap)
}

/**
 * Handles user single input flow during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionInput(agent) {

  let params = agent.parameters

  // Ask rice type
  if (!params.riceType) {
    // TODO: add custom payload for user question
    agent.add("")
    return
  }

  // Ask province
  if (!params.province) {
    // TODO: add custom payload for user question
    agent.add("")
    return
  }

  // Ask season
  if (!params.season) {
    // TODO: add custom payload for user question
    agent.add("")
    return
  }

  // Ask area
  if (!params.riceArea) {
    // TODO: add custom payload for user question
    agent.add("")
    return
  }

  if (!params.rainFrequency) {
      
    // Skip to pest because rain frequency is not necessary for the following area
    if (canInferWaterLevel(params.riceArea)) {

      // clear all contexts, including auto-generated one (from required fields)
      clearAgentContexts(agent)

      // and then set new one with given params
      agent.context.set(context.recommending, 10, params)
      agent.context.set(context.inputPest, 2, params)

      // no return since we will be fallback to case where all inputs are set
      
    } 
    
   // Ask rain Frequency
    else {
      // TODO: add custom payload for user question
      agent.add("")
      return
    }

  }

  // all inputs are set, ask for rice pests next
  // TODO: add custom payload for user question
  agent.add("")

}

/**
 * Handles when user finished inputting rice pests
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function pestInputFinished(agent) {
  // TODO: add custom payload for user question
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

  let ctx = agent.context.get(context.recommending)
  let params = ctx.parameters

  let factor = {
    riceType: params[contextParams.riceType],
    province: params[contextParams.province],
    inSeason: params[contextParams.inSeason],
    area: params[contextParams.area],
    rainFrequency: params[contextParams.rainFrequency],
    pests: params[contextParams.pests],
    diseases: params[contextParams.diseases]
  }

  // TODO: add custom payload for user question
  let riceSuggestions = getRiceBreedSuggestion(factor)
  agent.add(riceSuggestions.map(rice => rice.name + " (" + (rice.score * 100) + "%)").join(", "))

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