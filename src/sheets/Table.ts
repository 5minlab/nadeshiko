import fs from 'mz/fs';
import path from 'path';
import yaml from 'js-yaml';
import { RecordType, makeRecord, Record } from './Record';
import { makeAttributes, Attribute, AttributeType } from './Attribute';

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

	const knownIdAttr = attrs.find((a) => a.name === 'id');
	let records: Record[] = [];
	if (knownIdAttr) {
		records = values.slice(1).map((row) => makeRecord(attrs, row));
	} else {
		// id가 없는 경우 적당히 생성해서 넣어주기
		const idAttr = new Attribute(AttributeType.Integer, 'id');
		const newAttrs = [idAttr, ...attrs];
		records = values.slice(1).map((row, idx) => {
			const id = (idx + 1).toString();
			const newRow = [id, ...row];
			return makeRecord(newAttrs, newRow);
		});
	}

	const items = records.map((r) => r.value);
	return new Table(name, items);
};

