import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const root = resolve(__dirname, '..')
export const publicFolder = resolve(root, 'public')

export function publicFilePath(file) {
	return join(publicFolder, 'img', file)
}