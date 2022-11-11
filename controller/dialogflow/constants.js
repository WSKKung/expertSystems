export const context = {
	recommending: 'recommending',
	inputPest: 'input-pest',
	inputDisease: 'input-disease'
}

export const intent = {
	riceSuggest: 'แนะนำข้าว',
	riceSuggest_inputPest: 'แนะนำข้าว - เลือกศัตรูพืช',
	riceSuggest_inputDisease: 'แนะนำข้าว - เลือกโรคพืช',
	riceSuggest_inputDisease_confirm: 'แนะนำข้าว - เลือกโรคพืช - ยืนยัน',
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