import { area, disease, inSeason, pest, rainFrequency, region, riceType, waterLevel } from "./variables.js";
import { ScorerBuilder } from "./scorer.js";

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

// create a new scorer
function scorer() {
	return new ScorerBuilder()
}

addRice("กข 1", riceType.paddy, scorer()
	.add({ area: area.irrigatedLowland }, 3)
	.add({ pest: pest.greenLeafhopper }, 2)
	.add({ disease: disease.brownSpot }, 1)
	.build()
)

addRice("กข 12 (หนองคาย)", riceType.sticky, scorer()
	.add({ inSeason: inSeason.yes }, 2)
	.add({ area: area.rainfedLowland }, 3)
	.add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }] }, 1)
	.build()
)

addRice("กข 41", riceType.paddy, scorer()
	.add({ area: area.irrigatedLowland }, 3)
	.add({ region: region.north }, 1)
	.add({ pest: pest.brownPlanthopper }, 2)
	.add({ disease: disease.blast }, 1)
	.build()
)
