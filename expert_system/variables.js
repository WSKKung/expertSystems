// ประเภทข้าว
export const riceType = {
	paddy: 'paddy',
	sticky: 'sticky',
	japanese: 'japanese',
	barley: 'barley',
	wheat: 'wheat'
}

// ความถี่ของฝน
export const rainFrequency = {
	low: 'low',
	average: 'average',
	high: 'high'
}

// ระดับน้ำ
export const waterLevel = {
	low: 'low',
	average: 'average',
	high: 'high',
}

// นาปี/นาปรัง
export const inSeason = { 
	yes: 'yes', 
	no: 'no'
}

// จังหวัด
export const province = {
	kampaengPhet: 'kampaengPhet',
	chiangRai: 'chiangRai',
	chiangMai: 'chiangMai',
	tak: 'tak',
	nakhonSawan: 'nakhonSawan',
	nan: 'nan',
	pichit: 'pichit',
	phitsanulok: 'phitsanulok',
	phetchabun: 'phetchabun',
	phrae: 'phrae',
	maeHongSon: 'maeHongSon',
	lampang: 'lampang',
	lamphun: 'lamphun',
	sukhothai: 'sukhothai',
	uttaradit: 'uttaradit',
	uthaiThani: 'uthaiThani',
	phayao: 'phayao',

	bangkok: 'bangkok',
	kanchanaburi: 'kanchanaburi',
	chanthaburi: 'chanthaburi',
	chachoengsao: 'chachoengsao',
	chonBuri: 'chonBuri',
	trat: 'trat',
	nakhonNayok: 'nakhonNayok',
	nakhonPathom: 'nakhonPathom',
	nonthaburi: 'nonthaburi',
	pathumThani: 'pathumThani',
	prachuapKhiriKhan: 'prachuapKhiriKhan',
	prachinBuri: 'prachinBuri',
	phraNakhonSiAyutthaya: 'phraNakhonSiAyutthaya',
	phetchaburi: 'petchaburi',
	rayong: 'rayong',
	ratchaburi: 'ratchaburi',
	lopBuri: 'lopBuri',
	samutPrakan: 'samutPrakan',
	samutSongkhram: 'samutSongkhram',
	samutSakhon: 'samutSakhon',
	saraburi: 'saraburi',
	singBuri: 'singBuri',
	suphanBuri: 'suphanBuri',
	angThong: 'angThong',
	saKaeo: 'saKaeo',

	kalasin: 'kalasin',
	khonKaen: 'khonKaen',
	chaiyaphum: 'chaiyaphum',
	yasothon: 'yasothon',
	nakhonPhanom: 'nakhonPhanom',
	nakhonRatchasima: 'nakhonRatchasima',
	buriRam: 'buriRam',
	mahaSarakham: 'mahaSarakham',
	roiEt: 'roiEt',
	loei: 'loei',
	siSaKet: 'siSaKet',
	sakonNakhon: 'sakonNakhon',
	surin: 'surin',
	nongKhai: 'nongkhai',
	udonThani: 'udonThani',
	ubonRatchathani: 'ubonRatchathani',
	mukdahan: 'mukdahan',
	amnatCharoen: 'amnatCharoen',
	nongBuaLamPhu: 'nongBuaLamPhu',

	krabi: 'krabi',
	chumphon: 'chumphon',
	trang: 'trang',
	nakhonSiThammarat: 'nakhonSiThammarat',
	narathiwat: '',
	pattani: '',
	phangnga: '',
	phatthalung: '',
	phuket: '',
	yala: '',
	ranong: '',
	songkhla: '',
	satun: '',
	suratThani: ''
}

// ภูมิภาค
export const region = {
	north: 'north',
	west: 'west',
	east: 'east',
	south: 'south',
	northeast: 'northeast'
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
	brownPlanthopper: 'brownPlanthopper', // เพลี้ยกระโดดสีน้ำตาล
	whitebackPlanthopper: 'whitebackPlanthopper', // เพลี้ยกระโดดหลังขาว
	greenLeafhopper: 'greenLeafhopper', // จักจั่นสีเขียว
	stemBorer: 'stemBorer', // หนอนกอ
	riceGallMidge: 'riceGallMidge' // แมลงบั่ว
}

// โรคพืช
export const disease = {
	blast: 'blast', // โรคไหม้
	brownSpot: 'brownSpot', // โรคใบจุดสีน้ำตาล
	narrowBrownSpot: 'narrowBrownSpot', // โรคใบขีดสีน้ำตาล
	bacterialBlight: 'bacterialBlight', // โรคขอบใบแห้ง
	bacterialLeafStreak: 'bacterialLeafStreak', // โรคใบขีดโปร่งแสง
	gallDwarf: 'gallDwarf', // โรคหูด
	dirtyPanicle: 'dirtyPanicle', // โรคเมล็ดด่าง
	riceTungro: 'riceTungro', // โรคใบสีส้ม
	rust: 'rust' // โรคราสนิม
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
		obj[p] = `${name}.${p}`
	})
	obj.name = name
	obj.values = props.map(p => obj[p])
	Object.freeze(obj)
}