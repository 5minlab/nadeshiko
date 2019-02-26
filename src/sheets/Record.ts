import { Attribute, AttributeValueType } from './Attribute';
import * as _ from 'lodash';
import { Cell } from './Cell';

export interface RecordType {
	id: number;
	[key: string]: AttributeValueType;
}

export class Record {
	private readonly cells: Cell[];

	constructor(cells: Cell[]) {
		this.cells = cells;
	}

	public get value() {
		const INVALID_ID = -987654321;
		const obj: RecordType = { id: INVALID_ID };
		this.cells.forEach((cell) => {
			obj[cell.key] = cell.value;
		});
		return obj;
	}
}

export const makeRecord = (attrs: Attribute[], row: string[]) => {
	const pairs = _.zip(attrs, row).map((pair) => ({
		attr: pair[0] as Attribute,
		data: pair[1] as string,
	}));
	const cells = pairs.map((pair) => new Cell(pair.attr, pair.data));
	return new Record(cells);
};
