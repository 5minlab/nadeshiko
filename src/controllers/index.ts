import createError from 'http-errors'
import { fetch } from '../commands/fetch'
import * as fslib from '../helpers/fslib'
import { TableCache } from '../cache'
import { DataSource } from '../datasource'
import { makeTable, Metadata, Table, RecordType } from '../sheets'
import { findVersions, findVersionInfo } from '../helpers'

export const getMetadata = async (cache: TableCache): Promise<Metadata> => {
	const metadata = await cache.loadMetadata()
	return metadata
}

export const getTable = async <T extends RecordType>(
	cache: TableCache,
	name: string
): Promise<Table<T>> => {
	const table = await cache.loadTable<T>(name)
	if (table.length) {
		return table
	} else {
		throw new createError.NotFound(`table not found: ${name}`)
	}
}

export const delTable = async (cache: TableCache, name: string) => {
	const result = await cache.dropTable(name)
	if (result) {
		return true
	} else {
		throw new createError.NotFound(
			`table not found or already deleted: ${name}`
		)
	}
}

export const getRecord = async (
	cache: TableCache,
	name: string,
	id: number | string
) => {
	const item = await cache.get(name, id)
	if (item) {
		return item
	} else {
		throw new createError.NotFound(`record not found: ${name}, ${id}`)
	}
}

export const syncTable = async (
	cache: TableCache,
	ds: DataSource,
	name: string
) => {
	const metadata = await cache.loadMetadata()
	const ref = metadata.findReference(name)
	if (!ref) {
		throw new Error('reference not found')
	}

	const founds = await ds.fetchSheets([ref])
	if (founds.length === 0) {
		throw new Error('sheet not found')
	}

	const found = founds[0]
	const sheet = makeTable(found.name, found.values)
	await cache.saveTable(sheet)
	await cache.touchVersion()
	return true
}

export const fetchAll = async (datasource: DataSource, dataPath: string) => {
	// TODO fetch를 권한 요청 없이 처리하는 방법?
	const { version, metadata } = await fetch(datasource, dataPath)
	return {
		version,
		metadata
	}
}

export const loadAll = async (
	cache: TableCache,
	dataPath: string,
	version: string
) => {
	const names = await fslib.findSheetNames(dataPath, version)
	const tasks = names.map(async name => {
		const table = await fslib.loadTable(dataPath, version, name)
		await cache.saveTable(table)
	})
	await Promise.all(tasks)

	const metadata = await fslib.loadMetadata(dataPath, version)
	await cache.saveMetadata(metadata)

	return {
		tables: names,
		metadata
	}
}

export const getVersions = async (dataPath: string, limit: number) => {
	const versions = await findVersions(dataPath)
	return versions.slice(0, limit)
}

export const getVersionInfo = async (dataPath: string, version: string) => {
	try {
		const info = await findVersionInfo(dataPath, version)
		return info
	} catch (err) {
		throw new createError.NotFound(`version not found: ${version}`)
	}
}
