import RedisMock from 'ioredis-mock';
import { RecordType, Table } from '../../sheets';
import { TableCache } from '..';
import * as faker from 'faker';

const name = faker.random.alphaNumeric(8);
const redis = new RedisMock();
const cache = new TableCache(redis, 'test');

const r1: RecordType = { id: 1, name: 'foo' };
const r2: RecordType = { id: 2, name: 'bar' };

beforeEach(async () => {
	await redis.flushall();
});

describe('saveTable - loadTable', () => {
	test('number id', async () => {
		const items = [r1, r2];
		const table = new Table(name, items);

		await cache.saveTable(table);
		expect(await cache.loadTable(name))
			.toEqual(table);
	});

	test('string id', async () => {
		const name = faker.random.alphaNumeric(8);
		const s1: RecordType = { id: 'aaa', name: 'foo' };
		const s2: RecordType = { id: 'bbb', name: 'bar' };
		const items = [s1, s2];
		const table = new Table(name, items);

		await cache.saveTable(table);
		expect(await cache.loadTable(name))
			.toEqual(table);
	});

	test('blank table', async () => {
		const name = faker.random.alphaNumeric(8);
		const table = new Table(name, []);
		await cache.saveTable(table);
		expect(await cache.loadTable(name))
			.toEqual(table);
	});

	test('table not found', async () => {
		const name = faker.random.alphaNumeric(8);
		expect(await cache.loadTable(name))
			.toEqual(new Table(name, []));
	});
});

describe('dropTable', () => {
	const name = faker.random.alphaNumeric(8);

	beforeEach(async () => {
		const items = [r1, r2];
		const table = new Table(name, items);
		await cache.saveTable(table);
	});

	test('ok', async () => {
		const result = await cache.dropTable(name);
		expect(result).toBeTruthy();
		expect(await cache.loadTable(name))
			.toEqual(new Table(name, []));
	});

	test('no table deleted', async () => {
		const name = faker.random.alphaNumeric(8);
		const result = await cache.dropTable(name);
		expect(result).toBeFalsy();
	});
});

describe('get', () => {
	const r1: RecordType = { id: 3, name: 'spam' };
	const r2: RecordType = { id: 'sample', name: 'jfdsl' };

	beforeEach(async () => {
		const items = [r1, r2];
		const table = new Table(name, items);
		await cache.saveTable(table);
	});

	test('number id', async () => {
		const item = await cache.get(name, r1.id);
		expect(item).toEqual(r1);
	});

	test('string id', async () => {
		const item = await cache.get(name, r2.id);
		expect(item).toEqual(r2);
	});

	test('id not found', async () => {
		const item = await cache.get(name, -1);
		expect(item).toBeUndefined();
	});

	test('table not found', async () => {
		const name = faker.random.alphaNumeric(8);
		const item = await cache.get(name, -1);
		expect(item).toBeUndefined();
	});
});
