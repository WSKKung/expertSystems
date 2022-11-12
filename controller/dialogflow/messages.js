import dialogflow from "dialogflow-fulfillment";
import { RiceBreed } from "../../expert_system/rice_rules.js";
import { publicFileURL } from "../../util/path.js";
import { area, riceType } from "../../expert_system/variables.js";

// I should just use Typescript lol

class RiceSuggestorMessageFactory {

	/**
	 * Create DialogFlow response message to ask user to select a rice type
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	riceTypeSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select a season to plant rice (either in-season or off-season)
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	riceSeasonSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select type of area to plant rice
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	 riceAreaSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select how much the rain falls in their area
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	rainFrequencySelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select rice pests in their area
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	pestSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message to ask user to select rice diseases in their area
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	diseaseSelector() { throw new Error("Unimpletemented") }

	/**
	 * Create DialogFlow response message for giving user a list of suggested rice breeds to plants
	 * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
	 * @returns {String | dialogflow.RichResponse} Response object
	 */
	riceSuggestionMessage(rices) {
		throw new Error("Unimpletemented")
	}

}

// LINE custom message creation handler 
export class LineChatMsgFactory extends RiceSuggestorMessageFactory {
	
	riceTypeSelector() {

		let message = {
			baseUrl: publicFileURL("img/rice_type_selector.png"),
			altText: "Select rice type",
			baseSize: {
				width: 1040,
				height: 1040
			},
			actions: [
				{
					type: "message",
					text: riceType.paddy,
					area: {
						x: 370,
						y: 484,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: riceType.sticky,
					area: {
						x: 37,
						y: 317,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: riceType.japanese,
					area: {
						x: 704,
						y: 317,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: riceType.barley,
					area: {
						x: 37,
						y: 684,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: riceType.wheat,
					area: {
						x: 704,
						y: 684,
						width: 306,
						height: 306
					}
				}
			]
		}

		return new dialogflow.Payload( dialogflow.Platforms.LINE, message )

	}

	riceSeasonSelector() {

		let message = {
			
		}
		
		return new dialogflow.Payload( dialogflow.Platforms.LINE, message )
	}

	riceAreaSelector() {

		let message = {
			baseUrl: publicFileURL("img/rice_area_selector.png"),
			altText: "Select rice type",
			baseSize: {
				width: 1040,
				height: 1040
			},
			actions: [
				{
					type: "message",
					text: area.irrigatedLowland,
					area: {
						x: 39,
						y: 350,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: area.rainfedLowland,
					area: {
						x: 368,
						y: 350,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: area.floating,
					area: {
						x: 697,
						y: 350,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: area.deepwater,
					area: {
						x: 39,
						y: 695,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: area.upland,
					area: {
						x: 368,
						y: 695,
						width: 306,
						height: 306
					}
				},
				{
					type: "message",
					text: area.highland,
					area: {
						x: 697,
						y: 695,
						width: 306,
						height: 306
					}
				},
			]
		}

		return new dialogflow.Payload( dialogflow.Platforms.LINE, message )
	}

	rainFrequencySelector() {

		let message = {
			
		}
		
		return new dialogflow.Payload( dialogflow.Platforms.LINE, message )
	}

	pestSelector() {

		let message = {
			
		}

		return new dialogflow.Payload( dialogflow.Platforms.LINE, message )

	}

	diseaseSelector() {

		let message = {
			
		}

		return newdialogflow. Payload( dialogflow.Platforms.LINE, message )

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