import { dirname, join, resolve } from 'path'
import { fileURLToPath, URL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const root = resolve(__dirname, '..')
export const publicFolder = resolve(root, 'public')
export const hostURL = new URL(process.env.hostname || 'http://localhost:8081')

/**
 * 
 * @param {String} filePath relative path to file from public folder
 * @returns {URL} Full URL to file
 */
export function publicFileURL(filePath) {
  let path = join("/", filePath)
  return new URL(path, hostURL)
}