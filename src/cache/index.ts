import Redis from 'ioredis';
import { RecordType, Table, Metadata, Reference, Constraint } from '../sheets';
import * as _ from 'lodash';

const makeTableKey = (table: string) => {
	const key = `nadeshiko:${table}`;
	return key;
};

const makeConstraintsKey = () => {
	const key = `nadeshiko:constraints`;
	return key;
};

const makeReferencesKey = () => {
	const key = `nadeshiko:references`;
	return key;
};


export class TableCache {
	private readonly redis: Redis.Redis;

	constructor(redis: Redis.Redis) {
		this.redis = redis;
	}

	public async mset<T extends RecordType>(name: string, items: T[]) {
		if (items.length === 0) { return; }
		const key = makeTableKey(name);
		const args = _.flatten(items.map((item) => [
			item.id.toString(),
			JSON.stringify(item),
		]));
		// hmset 할때 배열을 풀어서 넣지 않으면
		// ioredis의 결과과 ioredis-mock의 결과가 달라진다
		await this.redis.hmset(key, ...args);
	}

	public async mget<T extends RecordType>(name: string) {
		const key = makeTableKey(name);
		const founds: { [key: string]: string } = await this.redis.hgetall(key);
		const values = _.values(founds);
		const items = values.map((data) => {
			const val = JSON.parse(data) as T;
			return { val };
		});
		return items.sort((a, b) => a.val.id - b.val.id).map((item) => item.val);
	}

	public async get<T extends RecordType>(name: string, id: number) {
		const key = makeTableKey(name);
		const field = id.toString();
		const found = await this.redis.hget(key, field);
		return found ? JSON.parse(found) as T : undefined;
	}

	public async saveTable<T extends RecordType>(table: Table<T>) {
		const name = table.name;
		const items = table.items;

		const key = makeTableKey(name);
		await this.redis.del(key);
		await this.mset(name, items);
	}

	public async loadTable<T extends RecordType>(name: string) {
		const items = await this.mget<T>(name);
		return new Table(name, items);
	}

	public async saveMetadata(metadata: Metadata) {
		await this.redis.mset(
			makeReferencesKey(),
			JSON.stringify(metadata.references),
			makeConstraintsKey(),
			JSON.stringify(metadata.constraints),
		);
	}

	public async loadMetadata() {
		const referenceData = await this.redis.get(makeReferencesKey());
		const constraintData = await this.redis.get(makeConstraintsKey());
		if (!referenceData || !constraintData) {
			return new Metadata([], []);
		}

		const refs = JSON.parse(referenceData) as Reference[];
		const rels = JSON.parse(constraintData) as Constraint[];
		return new Metadata(refs, rels);
	}
}
