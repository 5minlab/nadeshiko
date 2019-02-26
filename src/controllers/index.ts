import * as S from '../sheets';
import { fetch } from '../commands/fetch';
import * as fslib from '../helpers/fslib';
import { TableCache } from '../cache';
import { DataSource } from '../datasource';
import { makeTable } from '../sheets';
import { OAuth2Client } from 'googleapis-common';

export const getMetadata = async (cache: TableCache) => {
	const metadata = await cache.loadMetadata();
	return metadata;
};

export const getTable = async (cache: TableCache, name: string) => {
	const table = await cache.loadTable(name);
	if (table.length) {
		return table;
	} else {
		throw new Error('table not found');
	}
};

export const getRecord = async (cache: TableCache, name: string, id: number) => {
	const item = await cache.get(name, id);
	if (item) {
		return item;
	} else {
		throw new Error('record not found');
	}
};

export const syncTable = async (
	cache: TableCache,
	ds: DataSource,
	name: string,
) => {
	const metadata = await cache.loadMetadata();
	const ref = metadata.findReference(name);
	if (!ref) { throw new Error('reference not found'); }

	const founds = await ds.fetchSheets([ref]);
	if (founds.length === 0) { throw new Error('sheet not found'); }

	const found = founds[0];
	const sheet = makeTable(found.name, found.values);
	await cache.saveTable(sheet);
	return true;
};

export const fetchAll = async (
	datasource: DataSource,
	dataPath: string,
) => {
	// TODO fetch를 권한 요청 없이 처리하는 방법?
	const { version, metadata } = await fetch(datasource, dataPath);
	return {
		version,
		metadata,
	};
};

export const loadAll = async (
	cache: TableCache,
	dataPath: string,
	version: string,
) => {
	const names = await fslib.findSheetNames(dataPath, version);
	const tasks = names.map(async (name) => {
		const table = await fslib.loadTable(dataPath, version, name);
		await cache.saveTable(table);
	});
	await Promise.all(tasks);

	const metadata = await fslib.loadMetadata(dataPath, version);
	await cache.saveMetadata(metadata);

	return {
		tables: names,
		metadata,
	};
};


