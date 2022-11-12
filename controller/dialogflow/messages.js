import { Payload, Platforms, RichResponse } from "dialogflow-fulfillment";
import { RiceBreed } from "../../expert_system/rice_rules";
import { ImageMapMessage } from "@line/bot-sdk/dist/types"

// I should just use Typescript lol

class RiceSuggestorMessageFactory {

	/**
	 * Create DialogFlow response message to ask user to select a rice type
	 * @returns {String | RichResponse} Response object
	 */
	riceTypeSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select a season to plant rice (either in-season or off-season)
	 * @returns {String | RichResponse} Response object
	 */
	riceSeasonSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select how much the rain falls in their area
	 * @returns {String | RichResponse} Response object
	 */
	rainFrequencySelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select rice pests in their area
	 * @returns {String | RichResponse} Response object
	 */
	pestSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select rice diseases in their area
	 * @returns {String | RichResponse} Response object
	 */
	diseaseSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message for giving user a list of suggested rice breeds to plants
	 * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
	 * @returns {String | RichResponse} Response object
	 */
	riceSuggestionMessage(rices) {
		throw new Error("Unimpletemented")
	}

}

// LINE custom message creation handler 
export class LineChatMsgFactory extends RiceSuggestorMessageFactory {
	
	riceTypeSelector() {
		
		/** @type {ImageMapMessage} */
		let message = {
			
		}

		return new Payload( Platforms.LINE, message )

	}

	riceSeasonSelector() {

		/** @type {ImageMapMessage} */
		let message = {
			
		}
		
		return new Payload( Platforms.LINE, message )
	}

	rainFrequencySelector() {

		/** @type {ImageMapMessage} */
		let message = {
			
		}
		
		return new Payload( Platforms.LINE, message )
	}

	pestSelector() {

		/** @type {ImageMapMessage} */
		let message = {
			
		}

		return new Payload( Platforms.LINE, message )

	}

	diseaseSelector() {

		/** @type {ImageMapMessage} */
		let message = {
			
		}

		return new Payload( Platforms.LINE, message )

	}

	/**
	 * Create a rice breed suggestion message.
	 * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
	 */
	riceSuggestionMessage(rices) {
		
	}

}

// Simple custom message creation handler that should be compatable with all platforms
export class SimpleMessageFactory extends RiceSuggestorMessageFactory {



}