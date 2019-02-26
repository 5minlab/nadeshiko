import {
	Reference,
	Sheet,
} from '../sheets';

export interface DataSource {
	fetchReferences(): Promise<string[][]>;
	fetchConstraints(): Promise<string[][]>;
	fetchSheets(refs: Reference[]): Promise<Sheet[]>;
}
