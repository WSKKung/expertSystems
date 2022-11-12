import { publicFileURL } from "../util/path.js";
import { RiceBreed } from "./rice_rules.js";

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURIToRiceDetail(rice) {
	return riceDetailURLs.get(rice.name)
}

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURIToRiceImage(rice) {
	return process.env.hostname + "/img/rices/" + rice.name + ".png"
}

const riceDetailURLs = new Map()
riceDetailURLs.set("กข 1", "")