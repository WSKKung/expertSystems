import { getRiceByType, getRiceScorer, Rice } from "./rice_data.js";

/**
 * Get a list of rices and their score
 * @param {*} factor An object contains fields describing each factor
 * 					 that affect the breed of rice to plant.
 * @return {ScoredRice[]} A list of object containing the name of the rice breed and its rated score
 */
export function getRiceScoreList(factor) {

  if (!factor.riceType) {
    throw new Error("riceType must be present for factor object to score!")
  }

  let results = []
  let rices = getRiceByType(factor.riceType)

  for (let rice of rices) {
    let scorer = getRiceScorer(rice)
    let score = scorer.score(factor)
    results.push(new ScoredRice(rice, score))
  }

  return results

}

export class ScoredRice {
  /**
   * 
   * @param {Rice} rice 
   * @param {Number} score 
   */
  constructor(rice, score) {
    this.rice = rice
    this.score = score
  }
}