// ประเภทข้าว
export const riceType = {
	paddy: 'ข้าวเจ้า',
	sticky: 'ข้าวเหนียว',
	japanese: 'ข้าวญี่ปุ่น',
	barley: 'ข้าวบาร์เลย์',
	wheat: 'ข้าวสาลี'
}

// ความถี่ของฝน
export const rainFrequency = {
	low: 'ฝนน้อย',
	average: 'ฝนปานกลาง',
	high: 'ฝนมาก'
}

// ระดับน้ำ
export const waterLevel = {
	low: 'น้ำน้อย',
	average: 'น้ำปานกลาง',
	high: 'น้ำมาก',
}

// นาปี/นาปรัง
export const inSeason = { 
	yes: 'นาปี', 
	no: 'นาปรัง'
}

// จังหวัด
export const province = {
	kampaengPhet: 'กำแพงเพชร',
	chiangRai: 'เชียงราย',
	chiangMai: 'เชียงไหม่',
	tak: 'ตาก',
	nakhonSawan: 'นครสวรรค์',
	nan: 'น่าน',
	pichit: 'พิจิตร',
	phitsanulok: 'พิษณุโลก',
	phetchabun: 'เพชรบูรณ์',
	phrae: 'แพร่',
	maeHongSon: 'แม่ฮ่องสอน',
	lampang: 'ลำปาง',
	lamphun: 'ลำพูน',
	sukhothai: 'สุโขทัย',
	uttaradit: 'อุตรดิตถ์',
	uthaiThani: 'อุทัยธานี',
	phayao: 'พะเยา',

	bangkok: 'กรุงเทพมหานคร',
	kanchanaburi: 'กาญจนบุรี',
	chanthaburi: 'จันทบุรี',
	chachoengsao: 'ฉะเชิงเทรา',
	chonBuri: 'ชลบุรี',
	trat: 'ตราด',
	nakhonNayok: 'นครนายก',
	nakhonPathom: 'นครพนม',
	chainart: 'ชัยนาท',
	nonthaburi: 'นนทบุรี',
	pathumThani: 'ปทุมธานี',
	prachuapKhiriKhan: 'ประจวบคีรีขันธุ์',
	prachinBuri: 'ปราจีนบุรี',
	phraNakhonSiAyutthaya: 'พระนครศรีอยุธยา',
	phetchaburi: 'เพชรบุรี',
	rayong: 'ระยอง',
	ratchaburi: 'ราชบุรี',
	lopBuri: 'ลพบุรี',
	samutPrakan: 'สมุทรปราการ',
	samutSongkhram: 'สมุทรสงคราม',
	samutSakhon: 'สมุทรสาคร',
	saraburi: 'สระบุรี',
	singBuri: 'สิงค์บุรี',
	suphanBuri: 'สุพรรณบุรี',
	angThong: 'อ่างทอง',
	saKaeo: 'สระแก่ว',

	kalasin: 'กาฬสินธุ์',
	khonKaen: 'ขอนแก่น',
	chaiyaphum: 'ชัยภูมิ',
	yasothon: 'ยโสธร',
	nakhonPhanom: 'นครพนม',
	nakhonRatchasima: 'นครราชสีมา',
	buriRam: 'บุรีรัมย์',
	mahaSarakham: 'มหาสารคาม',
	roiEt: 'ร้อยเอ็ด',
	loei: 'เลย',
	siSaKet: 'ศรีสะเกธ',
	sakonNakhon: 'สกลนคร',
	surin: 'สุรินทร์',
	nongKhai: 'หนองคาย',
	udonThani: 'อุดรธานี',
	ubonRatchathani: 'อุบลราชธานี',
	mukdahan: 'มุกดาหาร',
	amnatCharoen: 'อำนาจเจริญ',
	nongBuaLamPhu: 'หนองบัวลำพู',

	krabi: 'กระบี่',
	chumphon: 'ชุมพร',
	trang: 'ตรัง',
	nakhonSiThammarat: 'นครศรีธรรมราช',
	narathiwat: 'นราธิวาส',
	pattani: 'ปัตตานี',
	phangnga: 'พังงา',
	phatthalung: 'พัทลุง',
	phuket: 'ภูเก็ต',
	yala: 'ยะลา',
	ranong: 'ระนอง',
	songkhla: 'สงขลา',
	satun: 'สตูล',
	suratThani: 'สุราษฏ์ธานี'
}

// ภูมิภาค
export const region = {
	north: 'เหนือ',
	middle: 'กลาง',
	west: 'ตะวันตก',
	east: 'ตะวันออก',
	northeast: 'ตะวันออกเฉียงเหนือ',
	south: 'ใต้'
}

// พื้นที่, นิเวศน์การปลูก
export const area = {
	rainfedLowland: 'rainfed_lowland',
	irrigatedLowland: 'irrigated_lowland',
	floating: 'floating',
	deepwater: 'deepwater',
	upland: 'upland',
	highland: 'highland'
}

// ศัตรูพืช
export const pest = {
	brownPlanthopper: 'เพลี้ยกระโดดสีน้ำตาล',
	whitebackPlanthopper: 'เพลี้ยกระโดดหลังขาว',
	greenLeafhopper: 'จักจั่นสีเขียว',
	stemBorer: 'หนอนกอ',
	riceGallMidge: 'แมลงบั่ว'
}

// โรคพืช
export const disease = {
	blast: 'โรคไหม้',
	brownSpot: 'โรคใบจุดสีน้ำตาล',
	narrowBrownSpot: 'โรคใบขีดสีน้ำตาล',
	bacterialBlight: 'โรคขอบใบแห้ง',
	bacterialLeafStreak: 'โรคใบขีดโปร่งแสง',
	gallDwarf: 'โรคหูด',
	dirtyPanicle: 'โรคเมล็ดด่าง',
	riceTungro: 'โรคใบสีส้ม',
	rust: 'โรคราสนิม'
}

makeEnum("riceType", riceType)
makeEnum("rainFrequency", rainFrequency)
makeEnum("waterLevel", waterLevel)
makeEnum("inSeason", inSeason)
makeEnum("province", province)
makeEnum("region", region)
makeEnum("area", area)
makeEnum("pest", pest)
makeEnum("disease", disease)

function makeEnum(name, obj) {
	let props = Object.keys(obj)
	props.forEach(p => {
		obj[p] = `${name}.${obj[p]}`
	})
	obj.name = name
	obj.values = props.map(p => obj[p])
	Object.freeze(obj)
}