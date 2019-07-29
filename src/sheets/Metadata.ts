import fs from 'mz/fs';
import path from 'path';
import yaml from 'js-yaml';
import { Constraint } from './Constraint';
import { Reference } from './Reference';

export class Metadata {
	public readonly version: string;
	public readonly references: Reference[];
	public readonly constraints: Constraint[];

	constructor(
		version: string,
		references: Reference[],
		constraints: Constraint[],
	) {
		this.version = version;
		this.references = references;
		this.constraints = constraints;
	}

	public async save(dataPath: string) {
		return Promise.all([
			this.saveItems(dataPath, `metadata-references.yaml`, this.references),
			this.saveItems(dataPath, `metadata-constraints.yaml`, this.constraints),
		]);
	}

	private async saveItems<T>(dataPath: string, filename: string, items: T[]) {
		const text = yaml.dump(items);
		const dst = path.resolve(dataPath, filename);
		await fs.writeFile(dst, text);
	}

	public findReference(table: string) {
		const founds = this.references.filter((x) => x.table === table);
		return founds.length ? founds[0] : undefined;
	}
}


