import { WebhookClient } from "dialogflow-fulfillment"
import { getRiceBreedSuggestion, canInferWaterLevel } from "../../expert_system/expert_system.js"
import { getRiceByName } from "../../expert_system/rice_data.js"
import { context, contextParams, intent } from "./constants.js"
import { getMessageFactory } from "./messages.js"
/**
 * Accept fulfillment request from Dialogflow.
 * @param {Request} req A Dialogflow request object
 * @param {Response} res A Dialogflow response obkect
 */
export function fullfillmentRequest(req, res) {
  let agent = new WebhookClient({ request: req, response: res })
  let intentMap = new Map()
  intentMap.set(intent.suggestRice.main, handleSuggestionInput)
  intentMap.set(intent.suggestRice.pests.input, handleSuggestionPestInput)
  intentMap.set(intent.suggestRice.pests.confirm, pestInputFinished)
  intentMap.set(intent.suggestRice.diseases.input, handleSuggestionDiseaseInput)
  intentMap.set(intent.suggestRice.diseases.confirm, finallyGetRiceSuggestion)
  intentMap.set(intent.getRiceDetail, getRiceDetails)
  agent.handleRequest(intentMap)
}

/**
 * Handles user single input flow during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionInput(agent) {

  let params = agent.parameters
  let responseMsgFactory = getMessageFactory(agent.requestSource)

  // Ask rice type
  if (!params.riceType) {
    agent.add(responseMsgFactory.riceTypeSelector())
    return
  }

  // Ask province
  if (!params.province) {
    agent.add(responseMsgFactory.provinceSelector())
    return
  }

  // Ask season
  if (!params.season) {
    agent.add(responseMsgFactory.riceSeasonSelector())
    return
  }

  // Ask area
  if (!params.riceArea) {
    agent.add(responseMsgFactory.riceAreaSelector())
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
      agent.add(responseMsgFactory.rainFrequencySelector())
      return
    }

  }

  // all inputs are set, ask for rice pests next
  agent.add(responseMsgFactory.pestSelector())

}

/**
 * Handles user list input of rice pests during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionPestInput(agent) {

  let responseMsgFactory = getMessageFactory(agent.requestSource)

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

  agent.add(responseMsgFactory.pestSelector(true))

}

/**
 * Handles when user finished inputting rice pests
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function pestInputFinished(agent) {
  let responseMsgFactory = getMessageFactory(agent.requestSource)
  agent.add(responseMsgFactory.diseaseSelector())
}

/**
 * Handles user list input of rice disease during rice suggestion process
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function handleSuggestionDiseaseInput(agent) {

  let responseMsgFactory = getMessageFactory(agent.requestSource)

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

  agent.add(responseMsgFactory.diseaseSelector(true))

}

/**
 * Endpoint for receiving all user inputs and give a rice suggestion to user
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function finallyGetRiceSuggestion(agent) {

  let responseMsgFactory = getMessageFactory(agent.requestSource)

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

  let riceSuggestions = getRiceBreedSuggestion(factor)
  agent.add(responseMsgFactory.riceSuggestionMessage(riceSuggestions))

}

/**
 * Give user rice details
 * @param {WebhookClient} agent An agent
 * @returns {void}
 */
function getRiceDetails(agent) {
  let responseMsgFactory = getMessageFactory(agent.requestSource)
  let riceBreed = agent.parameters[contextParams.riceBreed]
  let rice = getRiceByName(riceBreed)
  agent.add(responseMsgFactory.riceDetailMessage(rice))
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