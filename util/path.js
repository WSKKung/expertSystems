import { dirname, join, resolve } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const root = resolve(__dirname, '..')
export const publicFolder = resolve(root, 'public')

/**
 * 
 * @param {String} filePath relative path to file from public folder
 * @returns {URL} Full URL to file
 */
export function publicFileURL(filePath) {
  return process.env.hostname + "/" + filePath
}