import fse from 'fs-extra'
import path from 'path'
import yaml from 'js-yaml'
import { RecordType, Table, Constraint, Reference, Metadata } from '../sheets'

const makeFilePath = (dataPath: string, version: string, filename: string) => {
	const dbPath = path.resolve(dataPath, version)
	return path.resolve(dbPath, filename)
}

const readDataFile = async (
	dataPath: string,
	version: string,
	filename: string
) => {
	const fp = makeFilePath(dataPath, version, filename)
	const buf = await fse.readFile(fp)
	const text = buf.toString('utf8')
	const content = yaml.load(text)
	return content
}

export const findSheetNames = async (dataPath: string, version: string) => {
	const dbPath = path.resolve(dataPath, version)
	const list = (await fse.readdir(dbPath))
		.sort()
		.filter(x => x.includes('.yaml'))
		.filter(x => !x.startsWith('metadata-'))
		.map(x => x.replace('.yaml', ''))
	return list
}

export const loadTable = async <T extends RecordType>(
	dataPath: string,
	version: string,
	name: string
) => {
	if (name.startsWith('metadata-')) {
		return new Table(name, [])
	}

	try {
		const filename = `${name}.yaml`
		const items = (await readDataFile(dataPath, version, filename)) as T[]
		return new Table(name, items)
	} catch (err) {
		console.error(err)
		return new Table(name, [])
	}
}

export const loadMetadata = async (dataPath: string, version: string) => {
	const loadConstraints = async () => {
		const filename = `metadata-constraints.yaml`
		const items = (await readDataFile(
			dataPath,
			version,
			filename
		)) as Constraint[]
		return items
	}

	const loadReferences = async () => {
		const filename = `metadata-references.yaml`
		const items = (await readDataFile(
			dataPath,
			version,
			filename
		)) as Reference[]
		return items
	}

	const data = await Promise.all([
		await loadReferences(),
		await loadConstraints()
	])

	return new Metadata(version, ...data)
}
