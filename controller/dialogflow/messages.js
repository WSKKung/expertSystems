import { Payload, Platforms } from "dialogflow-fulfillment";
import { RiceBreed } from "../../expert_system/rice_rules";

export class LineChatMsgFactory {
	
	riceTypeSelector() {
		let payload = new Payload( Platforms.LINE, {
			
		} )
	}

	riceSeasonSelector() {

	}

	rainFrequencySelector() {

	}

	pestSelector() {

	}

	diseaseSelector() {

	}

	/**
	 * Create a rice breed suggestion message.
	 * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
	 */
	riceSuggestionMessage(rices) {
		
	}

}