export enum AttributeType {
	Integer,
	Float,
	String,
	Boolean,
	Date,
	Raw,
	Comment,
}

const attributeList: Array<{ ty: AttributeType, prefix: string }> = [
	{ ty: AttributeType.Integer, prefix: 'i_' },
	{ ty: AttributeType.Float, prefix: 'f_' },
	{ ty: AttributeType.String, prefix: 's_' },
	{ ty: AttributeType.Boolean, prefix: 'b_' },
	{ ty: AttributeType.Date, prefix: 'd_' },
	{ ty: AttributeType.Raw, prefix: 'r_' },
	{ ty: AttributeType.Comment, prefix: '_' },
];

export type AttributeValueType = (
	number | boolean | Date | string | null | undefined
);

export class Attribute {
	public readonly ty: AttributeType;
	public readonly name: string;

	constructor(ty: AttributeType, name: string) {
		this.ty = ty;
		this.name = name;
	}

	public static make(s: string) {
		if (!s.length) {
			throw new Error('blank attribute name');
		}

		const founds = attributeList.filter((pair) => s.startsWith(pair.prefix));
		if (founds.length === 0) {
			throw new Error(`unknown attribute name: ${s}`);
		}

		const found = founds[0];
		return new Attribute(found.ty, s.replace(found.prefix, ''));
	}

	public cast(v: string | undefined) {
		switch (this.ty) {
			case AttributeType.Integer: return castInteger(v);
			case AttributeType.Float: return castFloat(v);
			case AttributeType.Boolean: return castBoolean(v);
			case AttributeType.Date: return castDate(v);
			case AttributeType.String: return castString(v);
			case AttributeType.Raw: return castRaw(v);
			case AttributeType.Comment: return castBlank(v);
			default: throw new Error(`cannot cast type: ${this.ty} -> ${v}`);
		}
	}
}


const castInteger = (x: string | undefined) => {
	if (x) {
		return parseInt(x, 10);
	} else {
		return 0;
	}
};

const castFloat = (x: string | undefined) => {
	if (x) {
		return parseFloat(x);
	} else {
		return 0;
	}
};

const castBlank = (x: string | undefined) => undefined;

const trueValues = ['true', '1', 't'];
const falseValues = ['false', '0', 'f'];

const castBoolean = (x: string | undefined) => {
	if (x === undefined) { return false; }
	const v = x.toLowerCase();
	if (trueValues.includes(v)) { return true; }
	if (falseValues.includes(v)) { return false; }
	return false;
};

const castDate = (x: string | undefined) => {
	return x ? parseDate(x) : null;
};

const castRaw = (x: string | undefined) => {
	return x;
};

const castString = (x: string | undefined) => {
	return x || '';
};

const parseDate = (x: string) => {
	const s = x.replace(/ /g, '');
	const m = s.match(/(\d{4}).(\d{1,2}).(\d{1,2}).+(\d{2}):(\d{2}):(\d{2})/);
	if (m) {
		const hourOffset = x.includes('오후') ? 12 : 0;
		const year = parseInt(m[1], 10);
		const month = parseInt(m[2], 10);
		const day = parseInt(m[3], 10);
		const hour = parseInt(m[4], 10) + hourOffset;
		const minute = parseInt(m[5], 10);
		const second = parseInt(m[6], 10);
		return new Date(year, month - 1, day, hour, minute, second);

	} else {
		return null;
	}
};

export const makeAttributes = (row: string[]) => row.map((cell) => Attribute.make(cell));
