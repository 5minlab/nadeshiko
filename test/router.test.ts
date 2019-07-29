import express from 'express'
import 'express-async-errors'
import { myErrorHandler } from 'express-my-error-handler'
import path from 'path'
import RedisMock from 'ioredis-mock'
import { makeRouter } from '../src/router'
import request from 'supertest'

const redis = new RedisMock()
const version = '20190729-104113'
const dataPath = path.resolve(__dirname, 'testdata')
const prefix = 'test'
const router = makeRouter({
	prefix,
	redis,
	dataPath,
	metadataSheetId: 'test-metadata-sheet-id',
	serviceKey: {
		client_email: 'test-client-email',
		private_key: 'test-private-key'
	}
})

const app = express()
app.use(router)
app.use(myErrorHandler)

async function load() {
	return new Promise((resolve, reject) => {
		request(app)
			.post('/commands/load')
			.send({ version })
			.expect(200)
			.end((err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res.body)
				}
			})
	})
}

beforeAll(async () => {
	/* */
})

afterAll(async () => {
	await redis.flushdb()
})

describe('GET /tables/:table', () => {
	const ty = 'foo'
	beforeAll(async () => load())
	afterAll(async () => redis.flushdb())

	it('not exist', done => {
		request(app)
			.get('/tables/not-exist')
			.expect(404, done)
	})

	it('exist', done => {
		request(app)
			.get(`/tables/${ty}`)
			.expect(200, done)
	})
})

describe('GET /tables/:table/:id', () => {
	const ty = 'foo'
	beforeAll(async () => load())
	afterAll(async () => redis.flushdb())

	it('table not found', done => {
		request(app)
			.get('/tables/not-exist/1')
			.expect(404, done)
	})

	it('record not found', done => {
		request(app)
			.get(`/tables/${ty}/999`)
			.expect(404, done)
	})

	it('found', done => {
		request(app)
			.get(`/tables/${ty}/2`)
			.expect(200, done)
	})
})

describe('GET /metadata', () => {
	it('ok', done => {
		request(app)
			.get('/metadata/')
			.expect(200, done)
	})
})

describe('GET /versions/', () => {
	it('ok', done => {
		request(app)
			.get('/versions/')
			.expect(200, done)
	})
})

describe('GET /versions/:version', () => {
	it('not found', done => {
		request(app)
			.get('/versions/foo')
			.expect(404, done)
	})
	it('found', done => {
		request(app)
			.get(`/versions/${version}`)
			.expect(200, done)
	})
})
