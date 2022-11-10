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

// match object กับทุก properties ใน props 
// ถ้ามีบางตัวที่ค่าไม่ตรงจะตอบ false ทันที
// e.g.
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 1, b: 0 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 3, b: 1 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ b: 2 }) == false
// new AllMatchCondition({ a: 1, b: 2 }).test({ a: 1, b: 2 }) == true
export class AllMatchCondition extends Condition {

	/*
	* props: object ที่เก็บ properties ที่จะให้ตรวจสอบทั้งหมด
	* strict: flag ที่เมื่อ set จะตรวจสอบ properties โดยใช้ === แทน ==
	* useIncludes: flag ที่เมื่อ set จะใช้ method includes ในการตรวจสอบหากค่าของ properties ใน props มี method นั้นๆ
	*/
	constructor(props, strict = true, useIncludes = true) {
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
		return matchingKeys.every(key => this.propValueComparer(this.props[key], obj[key])  )
	}

}

// match object กับทุก properties ใน props 
// ค่าของทุก properties ใน prop ต้องเป็น array หรือ object ที่มี method includes(value)
// ถ้ามีค่าใน object บางตัวที่ไม่อยู่ใน array ของค่าใน props จะตอบ false ทันที
// new AllIncludeCondition({ a: [1, 2, 3] }).test({ a: 4 }) == false
// new AllIncludeCondition({ a: [1, 2, 3] }).test({ a: 2 }) == true
export class AllIncludeCondition extends Condition {
	
	constructor(props) {
		super()
		this.props = props
	}

	test(obj) {
		let matchingKeys = Object.keys(this.props)
		return matchingKeys.every(key => this.props[key].includes(obj[key]))
	}
}

export class InverseCondition extends Condition {
	constructor(baseCondition) {
		super()
		this.baseCondition = baseCondition
	}

	test(obj) {
		return !this.baseCondition.test(obj)
	}
}

export class AndCondition extends Condition {

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

export class OrCondition extends Condition {

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