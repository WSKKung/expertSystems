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
	.add({ pest: pest.greenLeafhopper }, 1)
	.add({ disease: disease.brownSpot }, 1)
	.build()
)

addRice("กข 12 (หนองคาย)", riceType.sticky, scorer()
	.add({ inSeason: inSeason.yes }, 1)
	.add({ area: area.rainfedLowland }, 1)
	.add({ either: [{ disease: disease.blast }, { disease: disease.brownSpot }] }, 1)
	.build()
)

addRice("กข 41", riceType.paddy, scorer()
	.add({ area: area.irrigatedLowland }, 1)
	.add({ region: region.north }, 1)
	.add({ pest: pest.brownPlanthopper }, 1)
	.add({ disease: disease.blast }, 1)
	.build()
)

addRice("กข 43", riceType.paddy, scorer()
	.add({ area: area.irrigatedLowland }, 1)
	.add({ not: { province: province.phitsanulok } }, 1)
	.add({ disease: disease.brownSpot }, 1)
	.build()
)

addRice("กข 47", riceType.paddy, scorer()
	.add({ area: area.irrigatedLowland }, 1)
	.add({ region: region.north }, 1)
	.add({ pest: pest.brownPlanthopper }, 1)
	.add({ disease: disease.blast }, 1)
	.build()
)