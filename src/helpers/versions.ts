import path from 'path';
import dayjs from 'dayjs';
import fs from 'mz/fs';

export const makeVersion = (d: Date) => {
	const day = dayjs(d);
	return day.format('YYYYMMDD-HHmmss');
};

export const findLatestVersion = async (dataPath: string) => {
	const list = await findVersions(dataPath);
	const first: string | undefined = list[0];
	return first;
};

export const findVersions = async (dataPath: string) => {
	const list = (await fs.readdir(dataPath)).sort().reverse();
	return list;
};

const isMetadata = (x: string) => x.startsWith('metadata-');

export const findVersionInfo = async (dataPath: string, version: string) => {
	const fp = path.resolve(dataPath, version);
	const list = (await fs.readdir(fp)).sort().reverse().map((x) => x.replace('.yaml', ''));
	const metadataList = list.filter((x) => isMetadata(x));
	const contentList = list.filter((x) => !isMetadata(x));
	return {
		metadata: metadataList,
		contents: contentList,
	};
};
