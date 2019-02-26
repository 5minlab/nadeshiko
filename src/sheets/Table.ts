import fs from 'mz/fs';
import path from 'path';
import yaml from 'js-yaml';
import { RecordType, makeRecord } from './Record';
import { makeAttributes } from './Attribute';

export class Table<T extends RecordType> {
	public readonly name: string;
	public readonly items: T[];

	constructor(name: string, items: T[]) {
		this.name = name;
		this.items = items;
	}

	public async save(dataPath: string) {
		const text = yaml.dump(this.items);
		const filename = `${this.name}.yaml`;
		const dst = path.resolve(dataPath, filename);
		await fs.writeFile(dst, text);
	}

	public get length() { return this.items.length; }
}


export const makeTable = (name: string, values: string[][]) => {
	const firstRow = values[0];
	const attrs = makeAttributes(firstRow);

	const records = values.slice(1).map((row) => makeRecord(attrs, row));
	const items = records.map((r) => r.value);

	return new Table(name, items);
};
