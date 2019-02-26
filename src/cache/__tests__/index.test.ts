import RedisMock from 'ioredis-mock';
import { RecordType } from '../../sheets';
import { TableCache } from '..';
import * as faker from 'faker';

const table = faker.random.alphaNumeric(8);
const redis = new RedisMock();
const cache = new TableCache(redis);

beforeEach(async () => {
	await redis.flushall();
});

describe('mset - mget', () => {
	test('ok', async () => {
		const v1: RecordType = { id: 1, name: 'foo' };
		const v2: RecordType = { id: 2, name: 'bar' };
		const items = [v1, v2];

		await cache.mset(table, items);
		const actual = await cache.mget<RecordType>(table);
		expect(actual).toEqual(items);
	});

	test('blank', async () => {
		const table = faker.random.alphaNumeric(8);
		await cache.mset(table, []);
		const actual = await cache.mget<RecordType>(table);
		expect(actual).toEqual([]);
	});
});

describe('get', () => {
	const v: RecordType = { id: 3, name: 'spam' };

	beforeEach(async () => {
		const items = [v];
		await cache.mset(table, items);
	});

	test('ok', async () => {
		const item = await cache.get(table, v.id);
		expect(item).toEqual(v);
	});

	test('id not found', async () => {
		const item = await cache.get(table, -1);
		expect(item).toBeUndefined();
	});

	test('table not found', async () => {
		const table = faker.random.alphaNumeric(8);
		const item = await cache.get(table, -1);
		expect(item).toBeUndefined();
	});
});
