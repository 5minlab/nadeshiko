export const getTableName = (r: string) => r.split('!')[0];
export const sanitizeRange = (r: string) => r.replace(/'/g, '');

export interface Sheet {
	name: string;
	values: string[][];
}
