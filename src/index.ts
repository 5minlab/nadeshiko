export {
	makeRouter,
} from './router';

export {
	TableCache,
} from './cache';

import Redis from 'ioredis';

import {
	TableCache,
	makeTableKey,
} from './cache';

import { RecordType } from './sheets';

import * as C from './controllers';
export const Controller = C;

export class Nadeshiko {
	private readonly prefix: string;
	private readonly cache: TableCache;

	constructor(redis: Redis.Redis, prefix: string) {
		this.prefix = prefix;
		this.cache = new TableCache(redis, prefix);
	}

	public key(ty: string) {
		return makeTableKey(this.prefix, ty);
	}

	public async mget<T extends RecordType>(ty: string): Promise<T[]> {
		const result = await C.getTable(this.cache, ty);
		return result.items as T[];
	}

	public async get<T extends RecordType>(ty: string, id: number | string) {
		const result = await C.getRecord(this.cache, ty, id);
		return result as T;
	}
}
