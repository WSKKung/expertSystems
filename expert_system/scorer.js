import { AllMatchCondition, AndCondition, InverseCondition, OrCondition, Condition } from "./conditions.js"

// a class which rates a given factor by a number in between 0-1
export class Scorer {

	// criteria should be an array of Criterion
	constructor(criteria) {

		this.criteria = criteria
		this.totalWeight = this.criteria
			.map(c => c.weight)
			.reduce((a, b) => a + b)

		Object.freeze(this)

	}

	/**
	 * Scores a given factor
	 * @param {*} factor  a factor
	 * @return {Number} A number between 0-1
	 */
	score(factor) {

		let score = this.criteria
			.filter(c => c.test(factor))
			.map(c => c.weight)
			.reduce((a, b) => a + b, 0)

		return score / this.totalWeight

	}

}

export class Criterion {

	/**
	 * @param {Object} criterion An object that specify the value of fields to check,
	 * 					you can also nest a list of subcriteria by using the 
	 * 					reserved fields `either` and `all` (case-sensitive).
	 * 					The results of each subcriteria will then be joined
	 * 					with an OR operator for `either`, and AND operator
	 * 					for `all`.
	 * @example 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 1, b: 2, c: 3 }) // true 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 4, b: 2 }) // false 
	 * new Criterion({ a: 1, b: 2 }).test({ }) // false 
	 * new Criterion({ either: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // true 
	 * new Criterion({ all: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // false 
	 * @param {Number} weight A weight of the criterion, should be > 0
	 *  */ 
	constructor(criterion, weight = 1) {

		this.weight = weight

		/**
		 * build Condition object from a given criterion object in JSON format
		 * @param {*} criterion criterion object
		 * @returns {Condition} new Condition
		 */
		function buildConditions(criterion) {
			
			const reservedKeywords = [
				{
					name: "all",
					action: (subcriteria) => {
						
						if (!subcriteria.map) {
							return buildConditions(subcriteria)
						}

						let subconditions = subcriteria.map(c => buildConditions(c))
						return new AndCondition(subconditions)
					}
				},
				{
					name: "either",
					action: (subcriteria) => {

						if (!subcriteria.map) {
							return buildConditions(subcriteria)
						}

						let subconditions = subcriteria.map(c => buildConditions(c))
						return new OrCondition(subconditions)

					}
				},
				{
					name: "not",
					action: (subcriterion) => {

						let subcondition = buildConditions(subcriterion)
						return new InverseCondition(subcondition)
						
					}
				}
			]

			let newCondition = null

			reservedKeywords.forEach(keyword => {
				if (criterion[keyword.name]) {
					newCondition = keyword.action(criterion[keyword.name])		
				}
			})

			if (!newCondition) {
				newCondition = new AllMatchCondition(criterion)
			}

			return newCondition

		}

		this.condition = buildConditions(criterion)

		Object.freeze(this)

	}

	/**
	 * Test if a given factor object matches the condition
	 * @param {*} factor 
	 * @return { Boolean } True if the condition are met
	 */
	test(factor) {
		return this.condition.test(factor)
	}

}

export class ScorerBuilder {

	constructor() {
		this.criteria = []
	}

	/**
	 * Add a new criterion to the scorer
	 * @param {*} criterion An object that specify the value of fields to check,
	 * 					you can also nest a list of subcriteria by using the 
	 * 					reserved fields `either` and `all` (case-sensitive).
	 * 					The results of each subcriteria will then be joined
	 * 					with an OR operator for `either`, and AND operator
	 * 					for `all`.
	 * @example 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 1, b: 2, c: 3 }) // true 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 4, b: 2 }) // false 
	 * new Criterion({ a: 1, b: 2 }).test({ }) // false 
	 * new Criterion({ either: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // true 
	 * new Criterion({ all: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // false 
	 * @see Criterion
	 * @param {Number} weight A weight of the criterion, should be > 0
	 *  */ 
	add(criterion, weight) {
		let newCriterion = new Criterion(criterion, weight)
		this.criteria.push(newCriterion)
		return this
	}

	/**
	 * Build a scorer
	 * @return {Scorer} A new scorer
	 */
	build() {
		return new Scorer(this.criteria)
	}

}