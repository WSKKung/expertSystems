import { getRiceScoreList } from "./rices.js"
import * as V from "./variables.js"

export function getRiceBreedSuggestion(factor) {

	// get water level properties

	// we can assume the water level is good if user has irrigation system
	if (
		factor.area === V.area.irrigatedLowland || 
		factor.rainFrequency === V.rainFrequency.average
	) {
		factor.waterLevel = V.waterLevel.average
	}
	else if (
		factor.area === V.area.floating || 
		factor.area === V.area.deepwater || 
		factor.rainFrequency === V.rainFrequency.high
	) {
		factor.waterLevel = V.waterLevel.high
	}
	else if (factor.rainFrequency === V.rainFrequency.low) {
		factor.waterLevel = V.waterLevel.low
	}
	else {
		throw Error("Not enough information provided to process waterLevel properties")
	}

	// get region from user province
	provincePerRegions.forEach((provinces, region) => {
		if (provinces.includes(factor.province)) {
			factor.region = region
		}
	}) 
	if (!factor.region) {
		throw Error("Not enough information provided to process region properties")
	}

	let riceScores = getRiceScoreList(factor)

	// grab only the top 3
	riceScores = riceScores.sort((a, b) => b.score - a.score).slice(0, 3)

	return riceScores

}

const provincePerRegions = new Map()

provincePerRegions.set(V.region.north, [
	V.province.chiangRai,
	V.province.nan,
	V.province.phayao,
	V.province.chiangMai,
	V.province.maeHongSon,
	V.province.phrae,
	V.province.lampang,
	V.province.lamphun,
	V.province.uttaradit
])

provincePerRegions.set(V.region.middle, [
	V.province.bangkok,
	V.province.phitsanulok,
	V.province.sukhothai,
	V.province.phetchabun,
	V.province.pichit,
	V.province.kampaengPhet,
	V.province.nakhonSawan,
	V.province.lopBuri,
	V.province.chainart,
	V.province.uthaiThani,
	V.province.singBuri,
	V.province.angThong,
	V.province.saraburi,
	V.province.phraNakhonSiAyutthaya,
	V.province.suphanBuri,
	V.province.nakhonNayok,
	V.province.pathumThani,
	V.province.nonthaburi,
	V.province.nakhonPathom,
	V.province.samutPrakan,
	V.province.samutSakhon,
	V.province.samutSongkhram
])

provincePerRegions.set(V.region.northeast, [
	V.province.nongKhai,
	V.province.nakhonPhanom,
	V.province.sakonNakhon,
	V.province.udonThani,
	V.province.nongBuaLamPhu,
	V.province.loei,
	V.province.mukdahan,
	V.province.kalasin,
	V.province.khonKaen,
	V.province.amnatCharoen,
	V.province.yasothon,
	V.province.roiEt,
	V.province.mahaSarakham,
	V.province.chaiyaphum,
	V.province.nakhonRatchasima,
	V.province.buriRam,
	V.province.surin,
	V.province.siSaKet,
	V.province.ubonRatchathani
])

provincePerRegions.set(V.region.west, [
	V.province.saKaeo,
	V.province.prachinBuri,
	V.province.chachoengsao,
	V.province.chonBuri,
	V.province.rayong,
	V.province.chanthaburi,
	V.province.trat
])

provincePerRegions.set(V.region.east, [
	V.province.tak,
	V.province.kanchanaburi,
	V.province.ratchaburi,
	V.province.phetchaburi,
	V.province.prachuapKhiriKhan
])

provincePerRegions.set(V.region.south, [
	V.province.krabi,
	V.province.chumphon,
	V.province.trang,
	V.province.nakhonSiThammarat,
	V.province.narathiwat,
	V.province.pattani,
	V.province.phangnga,
	V.province.phatthalung,
	V.province.phuket,
	V.province.yala,
	V.province.ranong,
	V.province.songkhla,
	V.province.satun,
	V.province.suratThani
])