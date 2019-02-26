import { makeAttributes } from '../Attribute';
import { makeRecord } from '../Record';

describe('Record', () => {
	const fields = makeAttributes(['i_id', 's_name', 'b_is_default', 'd_deleted_at']);

	test('ok #1', () => {
		const row = ['1', 'hello', 'TRUE'];
		const r = makeRecord(fields, row);
		const expected = {
			id: 1,
			name: 'hello',
			is_default: true,
			deleted_at: null,
		};
		expect(r.value).toEqual(expected);
	});

	test('ok #2', () => {
		const row = ['2', 'bar', 'FALSE'];
		const r = makeRecord(fields, row);
		const expected = {
			id: 2,
			name: 'bar',
			is_default: false,
			deleted_at: null,
		};
		expect(r.value).toEqual(expected);
	});

	test('ok #3', () => {
		const row = ['3', 'spam', 'FALSE', '1995. 9. 7 오전 10:40:52'];
		const r = makeRecord(fields, row);
		const expected = {
			id: 3,
			name: 'spam',
			is_default: false,
			deleted_at: new Date(1995, 9 - 1, 7, 10, 40, 52),
		};
		expect(r.value).toEqual(expected);
	});
});
