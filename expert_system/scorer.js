// a class which rates a given state by a number in between 0-1
class Scorer {

	// criteria should be an array of Criterion
	constructor(criteria) {

		this.criteria = criteria
		this.totalWeight = this.criteria
			.map(c => c.weight)
			.reduce((a, b) => a + b)

		Object.freeze(this)

	}

	score(state) {

		let score = this.criteria
			.filter(c => c.test(state))
			.map(c => c.weight)
			.reduce((a, b) => a + b)

		return score / this.totalWeight

	}

}

class Criterion {

	/**
	 * @param criterion An object that specify the value of fields to check,
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
	 * @param weight A weight of the criterion, should be > 0
	 *  */ 
	constructor(criterion, weight) {

		this.criterion = criterion
		this.weight = weight

		Object.freeze(this)

	}

	test(state) {

		const KEYWORD_EITHER = "either"
		const KEYWORD_ALL = "all"

		const RESERVED_PROPNAME = [
			KEYWORD_EITHER,
			KEYWORD_ALL
		]

		// test without reserved keywords
		function testWithCriterionObject(state, criterion) {
			let props = Object.keys(criterion)
			props = props.filter(p => !RESERVED_PROPNAME.includes(p))
			return props.every(p => criterion[p] === state[p])
		}

		// test all subcriteria in ALL
		if (this.criterion[KEYWORD_ALL]) {
			return this.criterion[KEYWORD_ALL].every(c => testWithCriterionObject(state, c))
		}
		// test all subcriteria in EITHER
		else if (this.criterion[KEYWORD_EITHER]) {
			return this.criterion[KEYWORD_EITHER].some(c => testWithCriterionObject(state, c))
		}

		return testWithCriterionObject(state, this.criterion)
	}

}

export class ScorerBuilder {

	constructor() {
		this.criteria = []
	}

	/**
	 * Add a new criterion to the scorer
	 * @param criterion An object that specify the value of fields to check,
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
	 * @param weight A weight of the criterion, should be > 0
	 *  */ 
	add(criterion, weight) {
		let newCriterion = new Criterion(criterion, weight)
		this.criteria.push(newCriterion)
		return this
	}

	/**
	 * Build a scorer
	 * @returns A new scorer
	 */
	build() {
		return new Scorer(this.criteria)
	}

}