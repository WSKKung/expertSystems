import { Payload } from "dialogflow-fulfillment";
import { ScoredRice } from "../../expert_system/rice_scores.js";
import { publicFileURL } from "../../util/path.js";
import { area, inSeason, disease, pest, rainFrequency, riceType } from "../../expert_system/variables.js";
import { Rice } from "../../expert_system/rice_data.js";

// I should just use Typescript lol

/**
 * Get an appropiate message factory for given platform
 * @param {String} platform platform
 * @returns {RiceSuggestorMessageFactory} message factory
 */
export function getMessageFactory(platform) {
  switch (platform) {
    case "LINE":
      return new LineChatMsgFactory()
    default:
      return new RiceSuggestorMessageFactory()
  }
}

export class RiceSuggestorMessageFactory {

  /**
   * Create DialogFlow response message to ask user to select a rice type
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  riceTypeSelector() {
    return "ได้เลยสิ! ว่าแต่เราอยากปลูกข้าวพันธ์ุไหนรึ? (ข้าวเจ้า, ข้าวเหนียว, ข้าวญี่ปุ่น, ข้าวบาร์เลย์, ข้าวสาลี)"
  }

  /**
   * Create DialogFlow response message to ask user to select a province
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  provinceSelector() {
    return "แล้ว...อยากปลูกที่จังหวัดอะไรล่ะ?"
  }

  /**
   * Create DialogFlow response message to ask user to select a season to plant rice (either in-season or off-season)
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  riceSeasonSelector() {
    return "อยากจะปลูกในฤดูไหนดีล่ะ?(นาปี, นาปรัง)"
  }

  /**
   * Create DialogFlow response message to ask user to select type of area to plant rice
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  riceAreaSelector() {
    return "แล้วพื้นที่นาของเราเป็นแบบไหน? (นาชลประทาน, นาน้ำฝน, นาข้าวขึ้นน้ำ, นาไร่, นาที่สูง)"
  }

  /**
   * Create DialogFlow response message to ask user to select how much the rain falls in their area
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  rainFrequencySelector() {
    return "ที่นั่นฝนตกมากมั้ย? (ฝนมาก, ฝนปานกลาง, ฝนน้อย)"
  }

  /**
   * Create DialogFlow response message to ask user to select rice pests in their area
   * @param {Boolean} repeating Set to true if user is currently giving input repeatedly, default to false
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  pestSelector(repeating = false) {
    return repeating ? "แล้วมีอะไรอีกมั้ย? ถ้าครบแล้วบอกลุงได้เลย" : "แถวนั้นมีแมลงอะไรระบาดอยู่หรอหนู?"
  }

  /**
   * Create DialogFlow response message to ask user to select rice diseases in their area
   * @param {Boolean} repeating Set to true if user is currently giving input repeatedly, default to false
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  diseaseSelector(repeating = false) {
    return repeating ? "แล้วมีอะไรอีกมั้ย? ถ้าครบแล้วบอกลุงได้เลย" : "แล้วโรคล่ะ! มีโรคอะไรระบาดแถวนั้นมั่งล่ะ?"
  }

  /**
   * Create DialogFlow response message for giving user a list of suggested rice breeds to plants
   * @param {ScoredRice[]} rices A list of rice breed entry to suggest to user
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  riceSuggestionMessage(rices) {
    let premessage = this.ricePresuggestMessage(rices)
    let messages = [ premessage ]
    rices.forEach((rice, index) => {
      messages.push((index + 1) + ". " + rice.rice.name)
    })
    return messages
  }

  /**
   * Create DialogFlow response message to send before giving list of rices to suggest to user
   * @param {ScoredRice[]} rices A list of rice breed entry to suggest to user
   * @returns {String | Payload | (String | Payload)[]} Response object
   */
  ricePresuggestMessage(rices) {
    return "จากที่ลุงลองนั่งคิดดูแล้ว ลุงว่าเราเหมาะกับข้าว " + rices.length + " พันธ์ุนี้ที่สุดแล้ว ลองเอาไปปลูกรับรองได้ผลผลิตงอกงามแน่ๆ เชื่อลุงสิ!"
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

    return [
      super.riceTypeSelector(),
      new Payload("LINE", message, { sendAsMessage: true })
    ]

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

    return [
      super.riceSeasonSelector(),
      new Payload("LINE", message, { sendAsMessage: true })
    ]

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

    return [
      super.riceAreaSelector(),
      new Payload("LINE", message, { sendAsMessage: true })
    ]
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

    return [
      super.rainFrequencySelector(),
      new Payload("LINE", message, { sendAsMessage: true })
    ]
  }

  pestSelector(repeating = false) {

    if (repeating) {
      return super.pestSelector(repeating)
    }

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

    return [
      super.pestSelector(repeating),
      new Payload("LINE", message, { sendAsMessage: true })
    ]

  }

  diseaseSelector(repeating = false) {

    if (repeating) {
      return super.diseaseSelector(repeating)
    }

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

    return [
      super.diseaseSelector(repeating),
      new Payload("LINE", message, { sendAsMessage: true })
    ]

  }

  /**
   * @param {ScoredRice[]} rices A list of rice breed entry to suggest to user
   */
  riceSuggestionMessage(rices) {

    let premessage = this.ricePresuggestMessage(rices)
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
     * @param {Rice} rice Rice
     */
    function createRiceCarouselEntry(rice) {
      let imgURL = rice.imgURL
      let detailURL = rice.detailURL
      return {
        thumbnailImageUrl: imgURL,
        title: rice.name,
        text: rice.type,
        actions: [
          {
            type: "uri",
            label: "รายละเอียด",
            uri: detailURL
          }
        ]
      }
    }

    for (let rice of rices) {
      let entry = createRiceCarouselEntry(rice.rice)
      message.template.columns.push(entry)
    }

    return [
      premessage,
      new Payload("LINE", message, { sendAsMessage: true })
    ]
  }

}