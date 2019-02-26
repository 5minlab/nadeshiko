export interface Reference {
	table: string;
	range: string;
	sheet: string;
}

export const toDataRange = (ref: Reference) => {
	return `${ref.table}!${ref.range}`;
};

export const makeReference = (row: string[]): Reference => {
	return {
		table: row[0],
		range: row[1],
		sheet: row[2],
	};
};

export const makeReferences = (values: string[][]) => {
	return values.map((row) => makeReference(row));
};

