import fs from 'mz/fs'
import path from 'path'
import * as _ from 'lodash'
import { makeVersion } from '../helpers'
import { DataSource } from '../datasource'
import { makeReferences, makeConstraints, Metadata, makeTable } from '../sheets'

export const fetch = async (ds: DataSource, dataPath: string) => {
	const version = makeVersion(new Date())

	const metadataList = await Promise.all([
		ds.fetchReferences(),
		ds.fetchConstraints()
	])
	const references = makeReferences(metadataList[0])
	const constraints = makeConstraints(metadataList[1])
	const metadata = new Metadata(version, references, constraints)

	const sheets = await ds.fetchSheets(references)
	const tables = sheets.map(sheet => {
		return makeTable(sheet.name, sheet.values)
	})

	const dstPath = path.resolve(dataPath, version)
	await fs.mkdir(dstPath)

	await metadata.save(dstPath)
	const tasks = tables.map(table => {
		return table.save(dstPath)
	})
	await Promise.all(tasks)

	return {
		version,
		metadata
	}
}

const main = async () => {
	// try {
	// 	await fetch(...);
	// } catch (err) {
	// 	console.error(err);
	// }
}

if (require.main === module) {
	main()
		.then(x => console.log(x))
		.catch(err => console.error(err))
}
