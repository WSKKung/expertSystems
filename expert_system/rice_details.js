import { publicFileURL } from "../util/path.js";
import { RiceBreed } from "./rice_rules.js";

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURLToRiceDetail(rice) {
  return "https://youtu.be/dQw4w9WgXcQ"
  //return riceDetailURLs.get(rice.name)
}

/**
 * 
 * @param {RiceBreed} rice rice
 * @return {String} URI String to PDF for the details of the rices
 */
export function getURLToRiceImage(rice) {
  return publicFileURL("/img/rices/" + rice.name)
}

const riceDetailURLs = new Map()
riceDetailURLs.set("กข 1", "")