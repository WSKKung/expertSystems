import { AllMatchCondition, AndCondition, InverseCondition, OrCondition, Condition } from "./conditions.js"

// a class which rates a given factor by a number in between 0-1
export class Scorer {

	/**
	 * Create a scorer
	 * @param {Criterion[]} criteria criteria
	 * @param {Number} bias bias
	 */
	constructor(criteria, bias = 0) {

		this.criteria = criteria
		this.bias = bias
		this.totalWeight = this.bias

		for (let criterion of this.criteria) {
			this.totalWeight += criterion.getMaxWeight()
		}

		if (this.totalWeight == 0) {
			throw new Error("Total weight of this scorer must not be zero!")
		}

		Object.freeze(this)

	}

	/**
	 * Scores a given factor
	 * @param {*} factor a factor
	 * @return {Number} A number between 0-1
	 */
	score(factor) {

		let score = this.bias

		for (let criterion of this.criteria) {
			score += criterion.getWeight(factor)
		}

		return score / this.totalWeight

	}
}

export class Criterion {

	/**
	 * @param {Object} criterion An object that specify the value of fields to check,
	 * 					you can also nest a list of subcriteria by using the 
	 * 					reserved fields `either`, `all`, `not` (case-sensitive).
	 * 					The results of each subcriteria will then be joined
	 * 					with an OR operator for `either`, AND operator
	 * 					for `all`. All the result will be reversed with `not`.
	 * @example 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 1, b: 2, c: 3 }) // true 
	 * new Criterion({ a: 1, b: 2 }).test({ a: 4, b: 2 }) // false 
	 * new Criterion({ a: 1, b: 2 }).test({ }) // false 
	 * new Criterion({ either: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // true 
	 * new Criterion({ all: [ { a: 1 }, { b: 2 } ] }).test({ a: 4, b: 2 }) // false 
	 * new Criterion({ not: { a: 1 } }).test({ a: 1, b: 2 }) // false 
	 * @param {Number} passWeight A weight to apply if the criterion test passed
	 * @param {Number} failWeight A weight to apply if the criterion test failed
	 *  */ 
	constructor(criterion, passWeight = 1, failWeight = 0) {

		this.passWeight = passWeight
		this.failWeight = failWeight

		/**
		 * build Condition object from a given criterion object in JSON format
		 * @param {*} criterion criterion object
		 * @returns {Condition} new Condition
		 */
		function buildConditions(criterion) {
			
			/** @type {{ name: String, action: (subcriteria: any) => Condition }[]} */
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

			for (let keyword of reservedKeywords) {
				let curCriterion = criterion[keyword.name]
				if (curCriterion) {
					newCondition = keyword.action(curCriterion)		
				}
			}

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
	 * @param {*} factor Factor object to check
	 * @return { Boolean } True if the condition are met
	 */
	test(factor) {
		return this.condition.test(factor)
	}

	/**
	 * Get weight value for a given factor
	 * @param {*} factor Factor object to check
	 * @return { Number } A weight value
	 */
	getWeight(factor) {
		return this.test(factor) ? this.passWeight : this.failWeight
	}

	/**
	 * Get maximum weight of this criterion no matter the test result
	 * @return { Number } A weight value
	 */
	getMaxWeight() {
		return Math.max([ this.passWeight, this.failWeight ]) 
	}

}

export class ScorerBuilder {

	/** @type {Criterion[]} */
	criteria = []

	/** @type {Number} */
	bias = 0

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
	 * @returns {this} This builder
	 *  */ 
	add(criterion, weight) {
		let newCriterion = new Criterion(criterion, weight)
		this.criteria.push(newCriterion)
		return this
	}

	/**
	 * Add bias value that will be always applied on scoring process
	 * @param {Number} value Bias value to apply
	 * @returns {this} This builder
	 */
	bias(value) {
		this.bias += value
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
