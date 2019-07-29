import path from 'path'
import dayjs from 'dayjs'
import fse from 'fs-extra'

const versionRegexp = /(\d){8}-(\d){6}/

export const makeVersion = (d: Date) => {
	const day = dayjs(d)
	return day.format('YYYYMMDD-HHmmss')
}

export const findLatestVersion = async (dataPath: string) => {
	const list = await findVersions(dataPath)
	const first: string | undefined = list[0]
	return first
}

export const findVersions = async (dataPath: string) => {
	const list = await readDirectory(dataPath)
	return list.filter(x => versionRegexp.test(x))
}

export const filterVersions = (list: string[]) => {
	return list.filter(x => versionRegexp.test(x))
}

const isMetadata = (x: string) => x.startsWith('metadata-')

const readDirectory = async (dataPath: string) => {
	const list = await fse.readdir(dataPath)
	return list.sort().reverse()
}

export const findVersionInfo = async (dataPath: string, version: string) => {
	const fp = path.resolve(dataPath, version)
	const list = await readDirectory(fp)
	return makeVersionInfo(list)
}

export const makeVersionInfo = (list: string[]) => {
	const names = list.map(x => x.replace('.yaml', ''))
	const metadataList = names.filter(x => isMetadata(x))
	const contentList = names.filter(x => !isMetadata(x))
	return {
		metadata: metadataList,
		contents: contentList
	}
}
