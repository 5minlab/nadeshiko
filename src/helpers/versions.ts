import dayjs from 'dayjs';
import fs from 'mz/fs';

export const makeVersion = (d: Date) => {
	const day = dayjs(d);
	return day.format('YYYYMMDD-HHmmss');
};

export const findLatestVersion = async (dataPath: string) => {
	const list = (await fs.readdir(dataPath)).sort().reverse();
	const first: string | undefined = list[0];
	return first;
};
