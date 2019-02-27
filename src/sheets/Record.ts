import { Attribute, AttributeValueType, AttributeType } from './Attribute';
import * as _ from 'lodash';
import { Cell } from './Cell';

export const INVALID_NUM_ID = -987654321;
export const INVALID_STR_ID = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export interface RecordType {
	id: number | string;
	[key: string]: AttributeValueType;
}

export class Record {
	private readonly cells: Cell[];
	private readonly idcell: Cell;

	constructor(cells: Cell[]) {
		this.cells = cells;
		this.idcell = cells.filter((cell) => cell.key === 'id')[0];
	}

	public get value() {
		// id를 제외한 값 채우기
		// id의 경우 필드 기본값과 다른것을 따라가니까
		const obj: { [key: string]: AttributeValueType } = {};
		this.cells
			.filter((cell) => cell.key !== 'id')
			.forEach((cell) => {
				obj[cell.key] = cell.value;
			});

		if (typeof this.idcell.raw === undefined || this.idcell.raw === '') {
			obj.id = this.getInvalidId();
		} else {
			obj.id = this.idcell.value;
		}

		const record = obj as RecordType;
		return record;
	}

	private getInvalidId(): number | string {
		const idcell = this.idcell;
		if (idcell) {
			switch (idcell.ty) {
				case AttributeType.Integer:
				case AttributeType.Float:
					return INVALID_NUM_ID;
				case AttributeType.String:
					return INVALID_STR_ID;
				default:
					break;
			}
		}
		return INVALID_NUM_ID;
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
