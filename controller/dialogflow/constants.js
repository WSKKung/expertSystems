export const context = {
	recommending: 'recommending',
	inputPest: 'input-pest',
	inputDisease: 'input-disease'
}

export const intent = {
	riceSuggest: 'แนะนำข้าว',
	inputPestForSuggestion: 'แนะนำข้าว - เลือกศัตรูพืช',
	confirmPestInputForSuggestion: 'แนะนำข้าว - เลือกศัตรูพืช - ยืนยัน',
	inputDiseaseForSuggestion: 'แนะนำข้าว - เลือกโรคพืช',
	confirmSuggestion: 'แนะนำข้าว - เลือกโรคพืช - ยืนยัน',
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