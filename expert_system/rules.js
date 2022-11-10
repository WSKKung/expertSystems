import { area, disease, pest, rainFrequency, riceType, waterLevel } from '../expert_system/variables.js'

class Rule {
	constructor(condition, resultFact) {
		this.condition = condition
		this.resultFact = resultFact
	}
	
	apply(obj) {
		if (this.condition.test(obj)) {
			Object.keys(this.resultFact).forEach((key) => {
				obj[key] = this.resultFact[key]
			})
			return true
		}
		return false
	}
}

class RuleBuilder {

	constructor(initialCondition) {
		this.condition = initialCondition
	}

	static if(props) {
		return new this(new AllMatchCondition(props))
	}

	static ifNot(props) {
		return new this(new InverseCondition(new AllMatchCondition(props)))
	}

	static ifIn(props) {
		return new this(new AllIncludeCondition(props))
	}

	static ifNotIn(props) {
		return new this(new InverseCondition(new AllIncludeCondition(props)))
	}

	and(props) {
		this.condition = this.condition.and(new AllMatchCondition(props))
		return this
	}

	andIn(props) {
		this.condition = this.condition.and(new AllIncludeCondition(props))
		return this
	}

	or(props) {
		this.condition = this.condition.or(new AllMatchCondition(props))
		return this
	}

	orIn(props) {
		this.condition = this.condition.or(new AllIncludeCondition(props))
		return this
	}

	andNot(props) {
		this.condition = this.condition.andNot(new AllMatchCondition(props))
		return this
	}

	andNotIn(props) {
		this.condition = this.condition.andNot(new AllIncludeCondition(props))
		return this
	}

	orNot(props) {
		this.condition = this.condition.orNot(new AllMatchCondition(props))
		return this
	}

	orNotIn(props) {
		this.condition = this.condition.orNot(new AllIncludeCondition(props))
		return this
	}

	then(facts) {
		return new Rule(this.condition, facts)
	}
}

class Condition {
	test(obj) {
		throw Error('test function is not implemented!')
	}

	and(other) {
		return new AndCondition([ this, other ])
	}

	or(other) {
		return new OrCondition([ this, other ])
	}

	andNot(other) {
		return new InverseCondition(this.and(other))
	}

	orNot(other) {
		return new InverseCondition(this.or(other))
	}
}

class IfEqualCondition extends Condition {

	constructor(propName, value) {
		super()
		this.propName = propName
		this.value = value
	}

	test(obj) {
		return obj[this.propName] === this.value
	}

}

// match object กับทุก properties ใน props 
// ถ้ามีบางตัวที่ค่าไม่ตรงจะตอบ false ทันที
// e.g.
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 1, b: 0 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 3, b: 1 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ b: 2 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 1, b: 2 }) == true
class AllMatchCondition extends Condition {

	/*
	* props: object ที่เก็บ properties ที่จะให้ตรวจสอบทั้งหมด
	* strict: flag ที่เมื่อ set จะตรวจสอบ properties โดยใช้ === แทน ==
	* useIncludes: flag ที่เมื่อ set จะใช้ method includes ในการตรวจสอบหากค่าของ properties ใน props มี method นั้นๆ
	*/
	constructor(props, strict = true, useIncludes = false) {
		super()
		this.props = props
		
		// o1 == prop value from condition
		// o2 == prop value from matching object
		this.propValueComparer = strict ? 
			(o1, o2) => o1 === o2 :
			(o1, o2) => o1 == o2

		if (useIncludes) {
			let oldComp = this.propValueComparer
			this.propValueComparer = (o1, o2) => {
				return o1.includes ? o1.includes(o2) : oldComp(o1, o2)
			}
		}
 	}

	test(obj) {
		let matchingKeys = Object.keys(this.props)
		return matchingKeys.every(key => obj[key] === this.props[key])
	}

}

// match object กับทุก properties ใน props 
// ค่าของทุก properties ใน prop ต้องเป็น array หรือ object ที่มี method includes(value)
// ถ้ามีค่าใน object บางตัวที่ไม่อยู่ใน array ของค่าใน props จะตอบ false ทันที
// new AllIncludeCondition({ a: [1, 2, 3] }).test({ a: 4 }) == false
// new AllIncludeCondition({ a: [1, 2, 3] }).test({ a: 2 }) == true
class AllIncludeCondition extends Condition {
	
	constructor(props) {
		super()
		this.props = props
	}

	test(obj) {
		let matchingKeys = Object.keys(this.props)
		return matchingKeys.every(key => this.props[key].includes(obj[key]))
	}
}

class InverseCondition extends Condition {
	constructor(baseCondition) {
		super()
		this.baseCondition = baseCondition
	}

	test(obj) {
		return !this.baseCondition.test(obj)
	}
}

class AndCondition extends Condition {

	constructor(conditions) {
		super()
		this.conditions = conditions
	}

	test(obj) {
		return this.conditions.every(c => c.test(obj))
	}

	and(other) {
		return new AndCondition(this.conditions.concat([ other ]))
	}

}

class OrCondition extends Condition {

	constructor(conditions) {
		super()
		this.conditions = conditions
	}

	test(obj) {
		return this.conditions.some(c => c.test(obj))
	}

	or(other) {
		return new OrCondition(this.conditions.concat([ other ]))
	}
}

const rules = []

function addRule(rule) {
	rules.push(rule)
}

addRule(RuleBuilder
	.if({ area: area.irrigatedLowland })
	.or({ rainFrequency: rainFrequency.average })
	.then({ waterLevel: waterLevel.average })
)

addRule(RuleBuilder
	.ifNot({ area: area.irrigatedLowland })
	.and({ rainFrequency: rainFrequency.low })
	.then({ waterLevel: waterLevel.low })
)

addRule(RuleBuilder
	.ifNot({ area: area.irrigatedLowland })
	.and({ rainFrequency: rainFrequency.high })
	.orIn({ area: [ area.floating, area.deepwater ] })
	.then({ waterLevel: waterLevel.high })
)

addRule(RuleBuilder
	.if({ riceType: riceType.paddy })
	.and({ area: area.irrigatedLowland	})
	.andIn({ pest: [ pest.greenLeafhopper ] })
	.andIn({ disease: [ disease.brownSpot ] })
	.then({ riceBreed: "กข1" })
)

export default {
	rules
}