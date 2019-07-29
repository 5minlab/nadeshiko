import RedisMock from 'ioredis-mock'
import { Nadeshiko } from '../src/nadeshiko'

const redis = new RedisMock()
const prefix = 'test'
const nadeshiko = new Nadeshiko(redis, prefix)
const ty = 'hello'

// sample data
const items = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }]

beforeAll(async () => {
	const key = `${prefix}:${ty}`
	const tasks = items.map(item => {
		return redis.hset(key, item.id.toString(), JSON.stringify(item))
	})
	await Promise.all(tasks)
})

afterAll(async () => {
	await redis.flushdb()
})

describe('key', () => {
	it('ok', () => {
		const key = nadeshiko.key(ty)
		expect(key).toBe(`${prefix}:${ty}`)
	})
})

describe('mget', () => {
	it('not exist', async () => {
		await expect(nadeshiko.mget('not-exist')).rejects.toThrow()
	})

	it('found', async () => {
		const founds = await nadeshiko.mget(ty)
		expect(founds).toHaveLength(2)
	})
})

describe('get', () => {
	it('table not exist', async () => {
		await expect(nadeshiko.get('not-exist', 1)).rejects.toThrow()
	})

	it('id not exist', async () => {
		await expect(nadeshiko.get(ty, 999)).rejects.toThrow()
	})

	it('found', async () => {
		const found = await nadeshiko.get(ty, 2)
		expect(found.id).toBe(2)
		expect(found.name).toBe('bar')
	})
})
