export const context = {
	recommending: 'recommending',
	inputPest: 'input-pest',
	inputDisease: 'input-disease'
}

export const intent = {
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

export const contextParams = {
	riceType: 'riceType',
    province: 'province',
    inSeason: 'season',
    area: 'riceArea',
    rainFrequency: 'rainFrequency',
    pests: 'curRicePests',
    diseases: 'curRiceDiseases',
	inputPest: 'ricePest',
	inputDisease: 'riceDisease'
}