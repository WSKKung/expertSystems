import { Payload } from "dialogflow-fulfillment";
import { RiceBreed } from "../../expert_system/rice_rules.js";
import { publicFileURL } from "../../util/path.js";
import { area, inSeason, disease, pest, rainFrequency, riceType } from "../../expert_system/variables.js";
import { getURIToRiceDetail, getURIToRiceImage } from "../../expert_system/rice_details.js";

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
      type: "imagemap",
      baseUrl: publicFileURL("/img/rice_type_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: riceType.paddy,
          area: { x: 370, y: 484, width: 306, height: 306 }
        },
        {
          type: "message",
          text: riceType.sticky,
          area: { x: 37, y: 317, width: 306, height: 306 }
        },
        {
          type: "message",
          text: riceType.japanese,
          area: { x: 704, y: 317, width: 306, height: 306 }
        },
        {
          type: "message",
          text: riceType.barley,
          area: { x: 37, y: 684, width: 306, height: 306 }
        },
        {
          type: "message",
          text: riceType.wheat,
          area: { x: 704, y: 684, width: 306, height: 306 }
        }
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })

  }

  riceSeasonSelector() {

    let message = {
      type: "imagemap",
      baseUrl: publicFileURL("/img/rice_season_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: inSeason.yes,
          area: { x: 29, y: 385, width: 466, height: 466 }
        },
        {
          type: "message",
          text: inSeason.no,
          area: { x: 542, y: 385, width: 466, height: 466 }
        }
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })
  }

  riceAreaSelector() {

    let message = {
      type: "imagemap",
      baseUrl: publicFileURL("/img/rice_area_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: area.irrigatedLowland,
          area: { x: 39, y: 350, width: 306, height: 306 }
        },
        {
          type: "message",
          text: area.rainfedLowland,
          area: { x: 368, y: 350, width: 306, height: 306 }
        },
        {
          type: "message",
          text: area.floating,
          area: { x: 697, y: 350, width: 306, height: 306 }
        },
        {
          type: "message",
          text: area.deepwater,
          area: { x: 39, y: 695, width: 306, height: 306 }
        },
        {
          type: "message",
          text: area.upland,
          area: { x: 368, y: 695, width: 306, height: 306 }
        },
        {
          type: "message",
          text: area.highland,
          area: { x: 697, y: 695, width: 306, height: 306 }
        },
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })
  }

  rainFrequencySelector() {

    let message = {
      type: "imagemap",
      baseUrl: publicFileURL("/img/rain_frequency_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: rainFrequency.high,
          area: { x: 32, y: 439, width: 306, height: 306 }
        },
        {
          type: "message",
          text: rainFrequency.average,
          area: { x: 368, y: 439, width: 306, height: 306 }
        },
        {
          type: "message",
          text: rainFrequency.low,
          area: { x: 704, y: 439, width: 306, height: 306 }
        }
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })
  }

  pestSelector() {

    let message = {
      type: "imagemap",
      baseUrl: publicFileURL("/img/rice_pest_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: pest.brownPlanthopper,
          area: { x: 37, y: 335, width: 306, height: 306 }
        },
        {
          type: "message",
          text: pest.whitebackPlanthopper,
          area: { x: 367, y: 335, width: 306, height: 306 }
        },
        {
          type: "message",
          text: pest.greenLeafhopper,
          area: { x: 697, y: 335, width: 306, height: 306 }
        },
        {
          type: "message",
          text: pest.stemBorer,
          area: { x: 37, y: 335, width: 306, height: 680 }
        },
        {
          type: "message",
          text: pest.riceGallMidge,
          area: { x: 367, y: 335, width: 306, height: 680 }
        },
        {
          type: "message",
          text: pest.nematodes,
          area: { x: 697, y: 335, width: 306, height: 680 }
        }
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })

  }

  diseaseSelector() {

    let message = {
      type: "imagemap",
      baseUrl: publicFileURL("/img/rice_disease_selector"),
      altText: "Select rice type",
      baseSize: { width: 1040, height: 1040 },
      actions: [
        {
          type: "message",
          text: disease.blast,
          area: { x: 49, y: 261, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.brownSpot,
          area: { x: 372, y: 261, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.narrowBrownSpot,
          area: { x: 696, y: 261, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.bacterialBlight,
          area: { x: 49, y: 501, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.bacterialLeafStreak,
          area: { x: 372, y: 501, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.gallDwarf,
          area: { x: 696, y: 501, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.dirtyPanicle,
          area: { x: 49, y: 742, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.riceTungro,
          area: { x: 372, y: 742, width: 295, height: 230 }
        },
        {
          type: "message",
          text: disease.rust,
          area: { x: 696, y: 742, width: 295, height: 230 }
        }
      ]
    }

    return new Payload("LINE", message, { sendAsMessage: true })

  }

  /**
   * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
   */
  riceSuggestionMessage(rices) {

    let message = {
      type: "template",
      altText: "Rice suggestions list",
      template: {
        type: "carousel",
        columns: []
      }
    }

    /**
     * Create entry for a carousel template message
     * @param {RiceBreed} rice Rice
     */
    function createRiceCarouselEntry(rice) {
      return {
        thumbnailImageUrl: getURIToRiceImage(rice),
        title: rice.name,
        text: (rice.score * 100) + "%",
        actions: [
          {
            type: "uri",
            label: "รายละเอียด",
            uri: getURIToRiceDetail(rice)
          }
        ]
      }
    }

    for (let rice of rices) {
      let entry = createRiceCarouselEntry(rice)
      message.template.columns.push(entry)
    }

    return new Payload("LINE", message, { sendAsMessage: true })
  }

}

// Simple custom message creation handler that should be compatable with all platforms
export class SimpleMessageFactory extends RiceSuggestorMessageFactory {

  riceTypeSelector() {
    return "ได้เลยสิ! ว่าแต่หนูอยากปลูกข้าวพันธ์ุไหนรึ? (ข้าวเจ้า, ข้าวเหนียว, ข้าวญี่ปุ่น, ข้าวบาร์เลย์, ข้าวสาลี)"
  }

  provinceSelector() {
    return "แล้ว...อยากปลูกที่จังหวัดอะไรล่ะ?"
  }

  riceSeasonSelector() {
    return "อยากจะปลูกในฤดูไหนดีล่ะ? (นาปี, นาปรัง)"
  }

  riceAreaSelector() {
    return "แล้วพื้นที่นาเป็นแบบไหนล่ะไอหนู? (นาชลประทาน, นาน้ำฝน, นาข้าวน้ำขึ้น, นาไร่, นาที่สูง)"
  }
  rainFrequencySelector() {
    return "ที่นั่นฝนตกมากมั้ย? (ฝนมาก, ฝนปานกลาง, ฝนน้อย)"
  }

  pestSelector() {
    return "Input pests"
  }

  diseaseSelector() {
    return "Input diseases"
  }

  /**
   * @param {RiceBreed[]} rices A list of rice breed entry to suggest to user
   */
  riceSuggestionMessage(rices) {
    return rices.map(rice => rice.name).join(", ")
  }

  /**
   * @return {String} Message
   */
  riceSuggestionPremessage() {
    return "แนะนำข้าว"
  }

}