import { google } from 'googleapis';
import {
	sanitizeRange,
	getTableName,
	Reference,
	toDataRange,
	Sheet,
} from '../sheets';
import { OAuth2Client } from 'googleapis-common';
import * as _ from 'lodash';
import { DataSource } from './base';

export class GSheetDataSource implements DataSource {
	private readonly auth: OAuth2Client;
	private readonly metadataSheetId: string;

	constructor(auth: OAuth2Client, metadataSheetId: string) {
		this.auth = auth;
		this.metadataSheetId = metadataSheetId;
	}

	public async fetchReferences(): Promise<string[][]> {
		const ref: Reference = {
			table: 'metadata-references',
			range: 'A2:C',
			sheet: this.metadataSheetId,
		};
		const founds = await this.fetchSheets([ref]);
		return founds[0].values;
	}

	public async fetchConstraints(): Promise<string[][]> {
		const ref: Reference = {
			table: 'metadata-constraints',
			range: 'A2:E',
			sheet: this.metadataSheetId,
		};
		const founds = await this.fetchSheets([ref]);
		return founds[0].values;
	}

	public async fetchSheets(refs: Reference[]): Promise<Sheet[]> {
		const groups = _.groupBy(refs, (x: Reference) => x.table);
		const keys = _.keys(groups);
		const tasks = keys.map(async (key) => {
			const refs = groups[key];
			const sheetId = refs[0].sheet;
			const founds = await this.fetch(sheetId, refs);
			return founds;
		});
		const founds = _.flatten(await Promise.all(tasks));
		return founds;
	}

	private async fetch(sheetId: string, refs: Reference[]) {
		const ranges = refs.map((r) => toDataRange(r));
		const sheets = google.sheets({ version: 'v4', auth: this.auth });
		const resp = await sheets.spreadsheets.values.batchGet({
			spreadsheetId: sheetId,
			ranges,
		});
		if (resp.status !== 200) { throw new Error(`batchGet failed: ${resp.statusText}`); }
		if (!resp.data.valueRanges) { throw new Error(`no values found`); }

		const founds = resp.data.valueRanges.map((found) => {
			const range = sanitizeRange(found.range!);
			const name = getTableName(range);
			const values = found.values!;
			return { name, values };
		});
		return founds;
	}
}


export interface ServiceKey {
	// type: string;
	// project_id: string;
	// private_key_id: string;
	private_key: string;
	client_email: string;
	// client_id: string;
	// auth_uri: string;
	// token_uri: string;
	// auth_provider_x509_cert_url: string;
	// client_x509_cert_url: string;
}

export const getJWTClient = async (serviceKey: ServiceKey): Promise<OAuth2Client> => {
	// http://isd-soft.com/tech_blog/accessing-google-apis-using-service-account-node-js/
	const client = new google.auth.JWT(
		serviceKey.client_email,
		undefined,
		serviceKey.private_key,
		['https://www.googleapis.com/auth/spreadsheets'],
	);
	return new Promise((resolve, reject) => {
		client.authorize((err, tokens) => {
			if (err) { reject(err); }
			else { resolve(client); }
		});
	});
};
