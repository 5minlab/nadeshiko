import Redis from 'ioredis';
import { RecordType, Table, Metadata, Reference, Constraint } from '../sheets';
import _ from 'lodash';

export const makeTableKey = (prefix: string, table: string) => {
	const key = `${prefix}:${table}`;
	return key;
};

const makeConstraintsKey = (prefix: string) => {
	const key = `${prefix}:constraints`;
	return key;
};

const makeReferencesKey = (prefix: string) => {
	const key = `${prefix}:references`;
	return key;
};

const makeVersionKey = (prefix: string) => {
	const key = `${prefix}:version`;
	return key;
};

const compareRecordId = <T extends RecordType>(a: T, b: T) => {
	if (typeof a.id === 'number' && typeof b.id === 'number') {
		return a.id - b.id;
	} else if (typeof a.id === 'string' && typeof b.id === 'string') {
		return a.id.localeCompare(b.id);
	}
	throw new Error(`invalid format: compare ${typeof a.id} and ${typeof b.id}`);
};

export class TableCache {
	private readonly redis: Redis.Redis;
	private readonly prefix: string;

	constructor(redis: Redis.Redis, prefix: string) {
		this.redis = redis;
		this.prefix = prefix;
	}

	private makeTableKey = (table: string) => makeTableKey(this.prefix, table);
	private makeConstraintsKey = () => makeConstraintsKey(this.prefix);
	private makeReferencesKey = () => makeReferencesKey(this.prefix);
	private makeVersionKey = () => makeVersionKey(this.prefix);

	public async mset<T extends RecordType>(name: string, items: T[]) {
		if (items.length === 0) { return; }
		const key = this.makeTableKey(name);
		const args = _.flatten(items.map((item) => [
			item.id.toString(),
			JSON.stringify(item),
		]));
		// hmset 할때 배열을 풀어서 넣지 않으면
		// ioredis의 결과과 ioredis-mock의 결과가 달라진다
		await this.redis.hmset(key, ...args);
	}

	public async mget<T extends RecordType>(name: string) {
		const key = this.makeTableKey(name);
		const founds: { [key: string]: string } = await this.redis.hgetall(key);
		const values = _.values(founds);
		const items = values.map((data) => {
			const val = JSON.parse(data) as T;
			return { val };
		});
		return items.sort((a, b) => compareRecordId(a.val, b.val))
			.map((item) => item.val);
	}

	public async get<T extends RecordType>(name: string, id: number | string) {
		const key = this.makeTableKey(name);
		const field = id.toString();
		const found = await this.redis.hget(key, field);
		return found ? JSON.parse(found) as T : undefined;
	}

	public async saveTable<T extends RecordType>(table: Table<T>) {
		const name = table.name;
		const items = table.items;

		const key = this.makeTableKey(name);
		await this.redis.del(key);
		await this.mset(name, items);
	}

	public async loadTable<T extends RecordType>(name: string) {
		const items = await this.mget<T>(name);
		return new Table(name, items);
	}

	public async dropTable(name: string) {
		const key = this.makeTableKey(name);
		const result = await this.redis.del(key);
		return result ? true : false;
	}

	public async saveMetadata(metadata: Metadata) {
		await this.redis.mset(
			this.makeVersionKey(),
			metadata.version,
			this.makeReferencesKey(),
			JSON.stringify(metadata.references),
			this.makeConstraintsKey(),
			JSON.stringify(metadata.constraints),
		);
	}

	public async touchVersion() {
		const key = this.makeVersionKey();
		const curr = await this.redis.get(key);
		if (curr) {
			if (!curr.endsWith('-dirty')) {
				const next = curr + '-dirty';
				await this.redis.set(key, next);
			}
		}
	}

	public async loadMetadata() {
		const versionData = await this.redis.get(this.makeVersionKey());
		const referenceData = await this.redis.get(this.makeReferencesKey());
		const constraintData = await this.redis.get(this.makeConstraintsKey());
		if (!versionData || !referenceData || !constraintData) {
			return new Metadata('NULL', [], []);
		}

		const references = JSON.parse(referenceData) as Reference[];
		const constraints = JSON.parse(constraintData) as Constraint[];
		return new Metadata(versionData, references, constraints);
	}

	public async dropMetadata() {
		await this.redis.del(
			this.makeVersionKey(),
			this.makeReferencesKey(),
			this.makeConstraintsKey(),
		);
	}
}
