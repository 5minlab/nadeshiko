import Redis from 'ioredis'
import express from 'express'
import { findLatestVersion } from './helpers'
import * as P from './protocols'
import * as C from './controllers'
import { TableCache } from './cache'
import { getJWTClient, ServiceKey, GSheetDataSource } from './datasource/gsheet'
import { OAuth2Client } from 'googleapis-common'

interface Options {
	metadataSheetId: string
	redis: Redis.Redis
	dataPath: string
	serviceKey: ServiceKey
	prefix?: string
}

export const makeRouter = (options: Options): express.Router => {
	const router = express.Router()

	const { metadataSheetId, redis, dataPath, serviceKey, prefix } = options

	const cache = new TableCache(redis, prefix || 'nadeshiko')

	let authInner: OAuth2Client
	const getAuth = async () => {
		if (!authInner) {
			authInner = await getJWTClient(serviceKey)
		}
		return authInner
	}

	const getDataSource = async () => {
		const auth = await getAuth()
		return new GSheetDataSource(auth, metadataSheetId)
	}

	const findVersion = async (req: express.Request) => {
		const body = req.body ? req.body : {}
		const { version } = body
		return version ? version : findLatestVersion(dataPath)
	}

	// table
	router.post('/tables/:table/sync', async (req, res) => {
		const { table } = await P.tableSchema.validate(req.params)
		const datasource = await getDataSource()
		const ok = await C.syncTable(cache, datasource, table)
		res.json({ ok })
	})

	router.get('/tables/:table', async (req, res) => {
		const { table } = await P.tableSchema.validate(req.params)
		const content = await C.getTable(cache, table)
		res.json(content)
	})

	router.delete('/tables/:table', async (req, res) => {
		const { table } = await P.tableSchema.validate(req.params)
		const ok = await C.delTable(cache, table)
		res.json({ ok })
	})

	// record
	router.get('/tables/:table/:id', async (req, res) => {
		const { table, id } = await P.itemSchema.validate(req.params)
		const item = await C.getRecord(cache, table, id)
		res.json(item)
	})

	// metadata
	router.get('/metadata', async (req, res) => {
		const metadata = await C.getMetadata(cache)
		res.json(metadata)
	})

	// version
	router.get('/versions/', async (req, res) => {
		const limit = parseInt(req.query.limit || '20', 10)
		if (isNaN(limit)) {
			throw new Error(`invalid limit: ${req.query.limit}`)
		}

		const versions = await C.getVersions(dataPath, limit)
		res.json(versions)
	})

	router.get('/versions/:version', async (req, res) => {
		const version: string = req.params.version
		const info = await C.getVersionInfo(dataPath, version)
		res.json({
			version,
			metadata: info.metadata,
			contents: info.contents
		})
	})

	// commands
	router.post('/commands/fetch', async (req, res) => {
		const datasource = await getDataSource()
		const { version, metadata } = await C.fetchAll(datasource, dataPath)
		res.json({
			version,
			metadata
		})
	})

	router.post('/commands/load', async (req, res) => {
		const version = await findVersion(req)
		const { tables, metadata } = await C.loadAll(cache, dataPath, version)
		res.json({
			version,
			tables,
			metadata
		})
	})

	return router
}

// export = nadeshiko;
