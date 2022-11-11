import { area, disease, inSeason, pest, province, rainFrequency, region, riceType, waterLevel } from "./variables.js";
import { ScorerBuilder } from "./scorer.js";

/**
 * Get a list
 * @param {*} factor An object contains fields describing each factor
 * 					 that affect the breed of rice to plant.
 * @return A list of object containing the name of the rice breed and its rated score
 */
export function getRiceScoreList(factor) {
  let scoreList = []
  let scorers = riceScorers.get(factor.riceType)
  scorers.forEach((scorer, name) => {
    scoreList.push({
      name: name,
      score: scorer.score(factor)
    })
  })
  return scoreList
}

// Map[riceType -> Map[ riceBreed, scorer ]]
const riceScorers = new Map()

/**
 * 
 * @param {*} name The name of the rice
 * @param {*} type The type of the rice. 
 * @param {*} scorer The scorer of the rice, created by invoking `scorer()`
 * @see riceType in `expert_system/variable.js`
 */
function addRice(name, type, scorer) {
  if (!riceScorers.has(type)) {
    riceScorers.set(type, new Map())
  }
  let map = riceScorers.get(type)
  map.set(name, scorer)
}

// shorthand for creating a new scorer
function scorer() {
  return new ScorerBuilder()
}

addRice("กข 1", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.greenLeafhopper }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .build()
)

addRice("กข 12 (หนองคาย 80)", riceType.sticky, scorer()
  .add({ inSeason: inSeason.yes }, 1)
  .add({ either: [{ area: area.rainfedLowland }, { area: area.upland }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }] }, 1)
  .build()
)

addRice("กข 41", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ region: region.north }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 43", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ not: { province: province.phitsanulok } }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .build()
)

addRice("กข 47", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 49", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 57", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ province: province.phetchaburi}, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .build()
)

addRice("กข 6", riceType.sticky, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .build()
)

addRice("กข 61", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .add({ either: [{ pest: pest.brownPlanthopper }, { pest: pest.whitebackPlanthopper }] }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 63", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }, { region: region.northeast }] }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .build()
)

addRice("กข 65", riceType.paddy, scorer()
  .add({ area: area.upland }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ pest: pest.brownPlanthopper }, 1)
  .build()
)

addRice("กข 69", riceType.paddy, scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 71", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .build()
)

addRice("กข 81", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("กข 83", riceType.paddy, scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข-แม่โจ้ 2", riceType.sticky, scorer()
  //.add({ area: area.no data here }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("กข 15", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .build()
)

addRice("กข 35 (รังสิต 80)", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.whitebackPlanthopper }, 1)
  .add({ disease: disease.bacterialBlight }, 1)
  .build()
)

addRice("กข 5", riceType.paddy, scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.deepwater }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .build()
)

addRice("กข 51", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.high }, 1)
  .build()
)

addRice("กข 59", riceType.paddy, scorer()
  .add({ either: [{ area: area.rainfedLowland }, { area: area.highland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("กข 73", riceType.paddy, scorer()
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 75", riceType.paddy, scorer()
  .add({ either: [{ area: area.upland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.blast }, 1)
  .build()
)

addRice("กข 79", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.middle }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("กำผาย 15", riceType.sticky, scorer()
  .add({ either: [{ area: area.irrigatedLowland }, { area: area.rainfedLowland }] }, 1)
  .add({ region: region.north }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("ขาวดอกมะลิ 105", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ region: region.north }, { region: region.northeast }] }, 1)
  .add({ waterLevel: waterLevel.low }, 1)
  .add({ pest: pest.nematodes }, 1)
  .build()
)

addRice("ชุมแพ 60", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ region: region.northeast }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)

addRice("ปทุมธานี 1", riceType.paddy, scorer()
  .add({ area: area.irrigatedLowland }, 1)
  .add({ region: region.middle }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ pest: pest.xxx }, 1)
  .add({ either: [{ pest: pest.brownPlanthopper }, { pest: pest.whitebackPlanthopper }] }, 1)
  .add({ either: [{ disease: disease.blast }, { disease: disease.bacterialBlight }] }, 1)
  .build()
)

addRice("เผือกน้ำ 43", riceType.paddy, scorer()
  //.add({ area: area.no data here }, 1)
  .add({ region: region.south }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .add({ disease: disease.brownSpot }, 1)
  .build()
)

addRice("พัทลุง 60", riceType.paddy, scorer()
  .add({ area: area.rainfedLowland }, 1)
  .add({ either: [{ province: province.nakhonSiThammarat }, { province: province.satun }, { province: province.phatthalung }, { province: province.songkhla }, { province: province.pattani }] }, 1)
  .add({ waterLevel: waterLevel.average }, 1)
  .build()
)
/*
addRice("xxx", riceType.xxx, scorer()
  .add({ area: area.xxx }, 1)
  .add({ region: region.xxx }, 1)
  .add({ waterLevel: waterLevel.xxx }, 1)
  .add({ pest: pest.xxx }, 1)
  .add({ disease: disease.xxx }, 1)
  .add({ either: [{ xxxx: xxx }, { xxxx: xxx }] }, 1)
  .build()
)
*/