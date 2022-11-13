export const context = {
	recommending: 'recommending',
	inputPest: 'recommending-input-pest',
	inputDisease: 'recommending-input-disease',
	recommendingFinished: 'recommending-finished'
}

export const intent = {
	getRiceDetail: 'สอบถามรายละเอียดพันธุ์ข้าว',
	suggestRice: {
		main: 'แนะนำข้าว',
		pests: {
			input: 'แนะนำข้าว - เลือกศัตรูพืช',
			confirm: 'แนะนำข้าว - เลือกศัตรูพืช - ยืนยัน'
		},
		diseases: {
			input: 'แนะนำข้าว - เลือกโรคพืช',
			confirm: 'แนะนำข้าว - เลือกโรคพืช - ยืนยัน'
		}
	}
}

export const entity = {
	riceType: 'riceType',
    province: 'province',
    inSeason: 'season',
    area: 'riceArea',
    rainFrequency: 'rainFrequency',
    pests: 'curRicePests',
    diseases: 'curRiceDiseases',
	inputPest: 'ricePest',
	inputDisease: 'riceDisease',
	riceBreed: 'riceBreed'
}