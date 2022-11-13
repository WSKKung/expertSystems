import { area, disease, inSeason, pest, province, region, riceType, waterLevel } from "./variables.js";
import { ScorerBuilder, Scorer } from "./scorer.js"
import { publicFileURL } from "../util/path.js"

export class Rice {

	/** @type {String} */
	imgURL

	/**
	 * 
	 * @param {String} name 
	 * @param {String} type 
	 * @param {Number} avgQuantity 
	 * @param {String} detailURL 
	 */
	constructor(name, type, avgQuantity, detailURL) {
		this.name = name
		this.type = type
		this.avgQuantity = avgQuantity
		this.imgURL = publicFileURL("/img/rices/" + name).href
		this.detailURL = detailURL
		this.scorer = scorer
	}
}

/** 
 * Get rice by name
 * @param {String} name rice breed name
 * @returns {Rice} rice
 */
export function getRiceByName(name) {
	return rices.get(name)
}

/** 
 * Get all rices of given type
 * @param {String} type rice type
 * @returns {Rice[]} list of rices
 */
export function getRiceByType(type) {
	let resultRices = []
	for (let rice of rices) {
		if (rice[1].type == type) {
			resultRices.push(rice[1])
		}
	}
	return resultRices
}

/** 
 * Get scorer for given rice
 * @param {Rice} rice 
 * @returns {Scorer} scorer
*/
export function getRiceScorer(rice) {
	return scorers.get(rice)
}

/** @type {Map<String,Rice>} */
const rices = new Map()

/** @type {Map<Rice,Scorer>} */
const scorers = new Map()

/**
 * 
 * @param {String} name rice breed name
 * @param {String} type rice type
 * @param {Number} avgQuantity average quantity harvested, used in sorting only
 * @param {String} detailURL url to rice details
 * @param {Scorer} scorer rice scorer
 */
function addRice(name, type, avgQuantity, detailURL, scorer) {
	let entry = new Rice(name, type, avgQuantity, detailURL)
	rices.set(name, entry)
	scorers.set(name, scorer)
}

// shorthand for creating a new scorer
function scorer() {
	return new ScorerBuilder()
}

addRice("กข 1", riceType.paddy, 742, 
	"https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%821.pdf",
	scorer()
	.add({ area: area.irrigatedLowland }, 1)
	.add({ waterLevel: waterLevel.average }, 1)
	.add({ pest: pest.greenLeafhopper }, 1)
	.add({ disease: disease.brownSpot }, 1)
	.add({ inSeason: inSeason.no }, 1)
	.build()
)

addRice("กข 12 (หนองคาย 80)", riceType.sticky, (422 + 522) / 2, 
"https://www.ricethailand.go.th/rkb3/03%E0%B8%81%E0%B8%8212%20(%E0%B8%AB%E0%B8%99%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%B2%E0%B8%A2%2080).pdf",
  scorer()
  .add({ either: [{ area: area.rainfedLowland }, { area: area.upland }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 41", riceType.paddy, 722, 
"https://www.ricethailand.go.th/rkb3/14%20%E0%B8%81%E0%B8%8241.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ region: region.north }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 43", riceType.paddy, 561, 
"https://www.ricethailand.go.th/rkb3/15%E0%B8%81%E0%B8%8243.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ not: { province: province.phitsanulok } }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 47", riceType.paddy, 793, 
"https://www.ricethailand.go.th/rkb3/16%E0%B8%81%E0%B8%8247.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 49", riceType.paddy, (733 + 939) / 2, 
"https://www.ricethailand.go.th/rkb3/17%E0%B8%81%E0%B8%8249.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 57", riceType.paddy, (714 + 1169) / 2, 
"https://www.ricethailand.go.th/rkb3/20%E0%B8%81%E0%B8%82%2057.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ province: province.phetchaburi }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 6", riceType.sticky, 666, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%826%20(RD6).pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 61", riceType.paddy, 1004, 
"https://www.ricethailand.go.th/rkb3/21%E0%B8%81%E0%B8%8261.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ pest: pest.brownPlanthopper }, { pest: pest.whitebackPlanthopper }] }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ either: [{ inSeason: inSeason.yes }, { inSeason: inSeason.no }] }, 1)
  .build()
  )

addRice("กข 63", riceType.paddy, 667, 
  "https://www.ricethailand.go.th/rkb3/22%E0%B8%81%E0%B8%8263.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }, { region: region.northeast }] }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 65", riceType.paddy, 673, 
  "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/154-65",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 69", riceType.paddy, 797, 
  "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/155-69",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 71", riceType.paddy, 818, 
  "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-11-16-06-11/2-uncategorised/84-71",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ inSeason: inSeason.yes }, { inSeason: inSeason.no }] }, 1)
  .build()
  )

addRice("กข 81", riceType.paddy, 630, 
  "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-22-11-21-41?id=171",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กข 83", riceType.paddy, (542 + 864) / 2, 
  "http://thairiceresearchjournal.ricethailand.go.th/index.php/2019-07-22-11-21-41?id=172",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ either: [{ inSeason: inSeason.yes }, { inSeason: inSeason.no }] }, 1)
  .build()
  )

addRice("กข-แม่โจ้ 2", riceType.sticky, 865, 
  "https://www.ricethailand.go.th/rkb3/05%E0%B8%81%E0%B8%82%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B9%82%E0%B8%88%E0%B9%892.pdf",
  scorer()
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ inSeason: inSeason.yes }, { inSeason: inSeason.no }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
)

addRice("กข 15", riceType.paddy, 560, 
  "https://www.ricethailand.go.th/rkb3/03%E0%B8%81%E0%B8%8215.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
)

addRice("กข 35 (รังสิต 80)", riceType.paddy, (600 + 650) / 2, 
"https://www.ricethailand.go.th/rkb3/05%E0%B8%81%E0%B8%8235%20%E0%B8%A3%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B4%E0%B8%9580.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.whitebackPlanthopper }, 1)
  .add({ disease: disease.bacterialBlight }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 5", riceType.paddy, 567, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%825.pdf",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.deepwater }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 51", riceType.paddy, 536, 
"https://www.ricethailand.go.th/rkb3/06%E0%B8%81%E0%B8%8251.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 59", riceType.paddy, 624, 
"https://www.ricethailand.go.th/rkb3/07%E0%B8%81%E0%B8%8259.pdf",
  scorer()
  .add({ either: [{ area: area.rainfedLowland }, { area: area.highland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 73", riceType.paddy, 627, 
"https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=142.htm",
  scorer()
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 75", riceType.paddy, 518, 
"https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=143.htm",
  scorer()
  .add({ either: [{ area: area.upland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
)

addRice("กข 79", riceType.paddy, 809, 
"https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=145.htm",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กำผาย 15", riceType.sticky, 569, 
"https://www.ricethailand.go.th/rkb3/07%E0%B8%81%E0%B8%B3%E0%B8%9C%E0%B8%B2%E0%B8%A2%2015%20(Gam%20Pai%2015).pdf",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ขาวดอกมะลิ 105", riceType.paddy, 363, 
"https://www.ricethailand.go.th/rkb3/09%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%A1%E0%B8%B0%E0%B8%A5%E0%B8%B4%20105.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ pest: pest.nematodes }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ชุมแพ 60", riceType.paddy, 564, 
"https://www.ricethailand.go.th/rkb3/14%E0%B8%8A%E0%B8%B8%E0%B8%A1%E0%B9%81%E0%B8%9E%2060.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ปทุมธานี 1", riceType.paddy, (650 + 774) / 2, 
"https://www.ricethailand.go.th/rkb3/27%E0%B8%9B%E0%B8%97%E0%B8%B8%E0%B8%A1%E0%B8%98%E0%B8%B2%E0%B8%99%E0%B8%B5%201.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.xxx }, 1)
  .add({ either: [{ pest: pest.brownPlanthopper }, { pest: pest.whitebackPlanthopper }] }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.bacterialBlight }] }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("เผือกน้ำ 43", riceType.paddy, 450, 
"https://www.ricethailand.go.th/rkb3/18%E0%B9%80%E0%B8%9C%E0%B8%B7%E0%B8%AD%E0%B8%81%E0%B8%99%E0%B9%89%E0%B8%B3%2043.pdf",
  scorer()
  .add({ region: region.south }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("พัทลุง 60", riceType.paddy, 457, 
"https://www.ricethailand.go.th/rkb3/21%E0%B8%9E%E0%B8%B1%E0%B8%97%E0%B8%A5%E0%B8%B8%E0%B8%87%2060.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ province: province.nakhonSiThammarat }, { province: province.satun }, { province: province.phatthalung }, { province: province.songkhla }, { province: province.pattani }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("พิษณุโลก 2", riceType.paddy, 807, 
"https://www.ricethailand.go.th/rkb3/30%E0%B8%9E%E0%B8%B4%E0%B8%A9%E0%B8%93%E0%B8%B8%E0%B9%82%E0%B8%A5%E0%B8%81%202.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ pest: pest.brownPlanthopper }, { pest: pest.whitebackPlanthopper }, { pest: pest.greenLeafhopper }] }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("พิษณุโลก 3", riceType.paddy, 604, 
"https://www.ricethailand.go.th/rkb3/22%E0%B8%9E%E0%B8%B4%E0%B8%A9%E0%B8%93%E0%B8%B8%E0%B9%82%E0%B8%A5%E0%B8%81%203.pdf",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("หอมกระดังงา 59", riceType.paddy, 578, 
"https://www.ricethailand.go.th/rkb3/27%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%94%E0%B8%B1%E0%B8%87%E0%B8%87%E0%B8%B2%2059.pdf",
  scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ province: province.nakhonSawan }, { province: province.uthaiThani }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("เหมยนอง 62 เอ็ม", riceType.sticky, 540, 
"https://www.ricethailand.go.th/rkb3/09%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%A2%E0%B8%99%E0%B8%AD%E0%B8%87%2062%20%E0%B9%80%E0%B8%AD%E0%B9%87%E0%B8%A1%20(%20Muey%20Nawng%2062%20M%20).pdf",
  scorer()
  //.add({ area: area.none }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.riceGallMidge }, 1)
  .add({ either: [{ disease: disease.brownSpot }, { disease: disease.riceTungro }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ตะเภาแก้ว 161", riceType.paddy, 350, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%95%E0%B8%B0%E0%B9%80%E0%B8%A0%E0%B8%B2%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%20161%20(Ta%20%E2%80%93%20pow%20Gaew%20161).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("นางฉลอง", riceType.sticky, 394, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%99%E0%B8%B2%E0%B8%87%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87%20(Nahng%20Cha%20%E2%80%93%20lawng).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ disease: disease.brownSpot }, { disease: disease.blast }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ปิ่นแก้ว 56", riceType.paddy, 362, 
"https://www.ricethailand.go.th/rkb3/03%E0%B8%9B%E0%B8%B4%E0%B9%88%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%A7%2056%20(Pin%20Gaew%2056).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("พลายงามปราจีนบุรี", riceType.paddy, 380, 
"https://www.ricethailand.go.th/rkb3/04%E0%B8%9E%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B8%87%E0%B8%B2%E0%B8%A1%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%20(Plai%20Ngahm%20Prachin%20Buri).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("เล็บมือนาง 111", riceType.paddy, 328, 
"https://www.ricethailand.go.th/rkb3/05%E0%B9%80%E0%B8%A5%E0%B9%87%E0%B8%9A%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%99%E0%B8%B2%E0%B8%87%20111%20(Leb%20Meu%20Nahng%20111).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ขาวบ้านนา 432", riceType.paddy, 449, 
"https://www.ricethailand.go.th/rkb3/06%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%E0%B8%99%E0%B8%B2%20432%20(Khao%20Bahn%20Nah%20432).pdf",
  scorer()
  .add({ area: area.floating }, 1)
  .add({ either: [{ region: region.east }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 19", riceType.paddy, 570, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%8219%20(RD19).pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ disease: disease.bacterialBlight }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 45", riceType.paddy, 520, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%81%E0%B8%8245%20(RD45).pdf",
  scorer()
  .add({ either: [{ area: area.rainfedLowland }, { area: area.deepwater }] }, 1)
  .add({ either: [{ region: region.middle }, { region: region.east }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("หันตรา 60", riceType.paddy, 425, 
"https://www.ricethailand.go.th/rkb3/03%E0%B8%AB%E0%B8%B1%E0%B8%99%E0%B8%95%E0%B8%A3%E0%B8%B260.pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ region: region.middle }, 1)
  .add({ either: [{ waterLevel: waterLevel.high }, { waterLevel: waterLevel.low }] }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ปราจีนบุรี 1", riceType.paddy, 450, 
"https://www.ricethailand.go.th/rkb3/04%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%201%20(Prachin%20Buri%201).pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ either: [{ region: region.middle }, { region: region.east }, { region: region.north }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.bacterialLeafStreak }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ปราจีนบุรี 2", riceType.paddy, 846, 
"https://www.ricethailand.go.th/rkb3/05%E0%B8%9B%E0%B8%A3%E0%B8%B2%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%9A%E0%B8%B8%E0%B8%A3%E0%B8%B5%202%20(Prachin%20Buri%202).pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ either: [{ region: region.middle }, { region: region.east }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.bacterialBlight }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("อยุธยา 1", riceType.paddy, 546, 
"https://www.ricethailand.go.th/rkb3/06%E0%B8%AD%E0%B8%A2%E0%B8%B8%E0%B8%98%E0%B8%A2%E0%B8%B2%201%20(Ayutthaya%201).pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ either: [{ region: region.middle }, { region: region.east }, { region: region.north }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ pest: pest.greenLeafhopper }, { pest: pest.brownPlanthopper }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("กข 17", riceType.paddy, 645, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%8217%20(RD17).pdf",
  scorer()
  .add({ area: area.deepwater }, 1)
  .add({ either: [{ region: region.middle }, { region: region.northeast }] }, 1)
  .add({ either: [{ waterLevel: waterLevel.high }, { waterLevel: waterLevel.low }] }, 1)
  .add({ disease: disease.bacterialBlight }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กู้เมืองหลวง", riceType.paddy, 240, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%81%E0%B8%B9%E0%B9%89%E0%B9%80%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%A7%E0%B8%87%20(Goo%20Meuang%20Luang).pdf",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ region: region.south }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ pest: pest.greenLeafhopper }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }, { disease: disease.narrowBrownSpot }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ขาวโป่งไคร้", riceType.sticky, 243, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%82%E0%B8%9B%E0%B9%88%E0%B8%87%E0%B9%84%E0%B8%84%E0%B8%A3%E0%B9%89%20(Khao%20Pong%20Krai).pdf",
  scorer()
  .add({ either: [{ area: area.upland }, { area: area.highland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.bacterialBlight }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("เจ้าฮ่อ", riceType.paddy, 210, 
"https://www.ricethailand.go.th/rkb3/03%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%AE%E0%B9%88%E0%B8%AD%20(Jow%20Haw).pdf",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ either: [{ region: region.middle }, { region: region.north }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ disease: disease.gallDwarf }, { disease: disease.blast }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ซิวแม่จัน", riceType.sticky, 456, 
"https://www.ricethailand.go.th/rkb3/04%E0%B8%8B%E0%B8%B4%E0%B8%A7%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%88%E0%B8%B1%E0%B8%99%20(Sew%20Mae%20Jan).pdf",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ either: [{ region: region.northeast }, { region: region.north }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ดอกพะยอม", riceType.paddy, 250, 
"https://www.ricethailand.go.th/rkb3/05%E0%B8%94%E0%B8%AD%E0%B8%81%E0%B8%9E%E0%B8%B0%E0%B8%A2%E0%B8%AD%E0%B8%A1%20(Dawk%20Pa-yawm).pdf",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ region: region.south }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }, { disease: disease.narrowBrownSpot }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("น้ำรู", riceType.paddy, 247, 
"https://www.ricethailand.go.th/rkb3/06%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%A3%E0%B8%B9%20(Nam%20Roo).pdf",
  scorer()
  .add({ either: [{ area: area.upland }, { area: area.highland }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.dirtyPanicle }] }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("เจ้าลีซอสันป่าตอง", riceType.paddy, 391, 
"https://www.ricethailand.go.th/rkb3/07%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%A5%E0%B8%B5%E0%B8%8B%E0%B8%AD%E0%B8%AA%E0%B8%B1%E0%B8%99%E0%B8%9B%E0%B9%88%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%87%20(Jow%20Lisaw%20San-pah-tawng).pdf",
  scorer()
  .add({ either: [{ area: area.upland }, { area: area.highland }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("เจ้าขาวเชียงใหม่", riceType.paddy, (350 + 389) / 2, 
"https://www.ricethailand.go.th/rkb3/08%E0%B9%80%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%82%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%20(Jow%20Khao%20Chiangmai).pdf",
  scorer()
  .add({ either: [{ area: area.upland }, { area: area.highland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ข้าวเหนียวลืมผัว", riceType.sticky, 568, 
"https://www.ricethailand.go.th/rkb3/09%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%80%E0%B8%AB%E0%B8%99%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%A5%E0%B8%B7%E0%B8%A1%E0%B8%9C%E0%B8%B1%E0%B8%A7.pdf",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("อาร์ 258", riceType.sticky, 252, 
"https://www.ricethailand.go.th/rkb3/title-index.php-file=content.php&id=94.htm",
  scorer()
  .add({ area: area.upland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("ข้าวหอมแดง", riceType.paddy, 643, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B9%81%E0%B8%94%E0%B8%87%20(Red%20Hawn%20Rice).pdf",
  scorer()
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.blast }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("สังข์หยดพัทลุง", riceType.paddy, 330, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B8%82%E0%B9%8C%E0%B8%AB%E0%B8%A2%E0%B8%94%E0%B8%9E%E0%B8%B1%E0%B8%97%E0%B8%A5%E0%B8%B8%E0%B8%87%20(Sang%20Yod%20Phattalung).pdf",
  scorer()
  .add({ province: province.phatthalung })
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.yes }, 1)
  .build()
  )

addRice("ข้าวหอมกุหลาบแดง", riceType.paddy, 750, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%AB%E0%B8%AD%E0%B8%A1%E0%B8%81%E0%B8%B8%E0%B8%AB%E0%B8%A5%E0%B8%B2%E0%B8%9A%E0%B9%81%E0%B8%94%E0%B8%87%20(Red%20Rose%20Rice).pdf",
  scorer()
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กวก. 1", riceType.japanese, 718,
"https://www.ricethailand.go.th/rkb3/01%20%E0%B8%81%E0%B8%A7%E0%B8%81.1.pdf",
  scorer()
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กวก. 2", riceType.japanese, 707, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%82%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%8D%E0%B8%B5%E0%B9%88%E0%B8%9B%E0%B8%B8%E0%B9%88%E0%B8%99%20%E0%B8%81%E0%B8%A7%E0%B8%81.2%20(Khao%E2%80%99Yipun%20DOA2).pdf",
  scorer()
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("สะเมิง 1 (ข้าวบาร์เลย์)", riceType.barley, 270, 
"https://www.ricethailand.go.th/rkb3/01%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%201%20(Samerng%201).pdf",
  scorer()
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
  )

addRice("สะเมิง 2 (ข้าวบาร์เลย์)", riceType.barley, 300, 
"https://www.ricethailand.go.th/rkb3/02%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%202%20(Samerng%202).pdf",
  scorer()
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
  )

addRice("ซีพี 304", riceType.paddy, 936, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%8B%E0%B8%B5%E0%B8%9E%E0%B8%B5%20304%20(CP%20304).pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กขผ 1", riceType.paddy, 1006, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%82%E0%B8%9C1.pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.middle }, { region: region.north }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.whitebackPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("กขผ 3", riceType.paddy, 1415, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%81%E0%B8%82%E0%B8%9C3%20(RDP3).pdf",
  scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.whitebackPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .add({ inSeason: inSeason.no }, 1)
  .build()
  )

addRice("สะเมิง 1 (ข้าวสาลี)", riceType.wheat, 330, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%201%20(Samerng%201).pdf",
  scorer()
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.rust }, 1)
  .build()
  )

addRice("สะเมิง 2 (ข้าวสาลี)", riceType.wheat, 450, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87%202%20(Samerng%202).pdf",
  scorer()
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
  )

addRice("แพร่ 60", riceType.wheat, 285, 
"https://www.ricethailand.go.th/rkb3/%E0%B9%81%E0%B8%9E%E0%B8%A3%E0%B9%88%2060.pdf",
  scorer()
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.rust }, 1)
  .build()
  )

addRice("ฝาง 60", riceType.wheat, 280, 
"https://www.ricethailand.go.th/rkb3/%E0%B8%9D%E0%B8%B2%E0%B8%87%2060%20(Fahng%2060).pdf",
  scorer()
  .add({ either: [{ area: area.irrigatedLowland, area: area.rainfedLowland }] }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.rust }, 1)
  .build()
  )