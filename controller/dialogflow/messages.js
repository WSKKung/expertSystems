import { Payload, Platforms } from "dialogflow-fulfillment";
import { RiceBreed } from "../../expert_system/rice_rules";
import { ImageMapMessage } from "@line/bot-sdk/dist/types"

export class LineChatMsgFactory {
	
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

export class SimpleMessageFactory {



}