import { makeAttributes } from '../Attribute';
import { makeRecord, INVALID_NUM_ID, INVALID_STR_ID } from '../Record';

describe('Record', () => {
	const attrs = makeAttributes([
		'i_id',
		's_name',
		'b_is_default',
		'd_deleted_at',
	]);

	test('ok #1', () => {
		const row = ['1', 'hello', 'TRUE'];
		const r = makeRecord(attrs, row);
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
		const r = makeRecord(attrs, row);
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
		const r = makeRecord(attrs, row);
		const expected = {
			id: 3,
			name: 'spam',
			is_default: false,
			deleted_at: new Date(1995, 9 - 1, 7, 10, 40, 52),
		};
		expect(r.value).toEqual(expected);
	});
});

describe('integer id', () => {
	const attrs = makeAttributes(['i_id']);

	test('exist', () => {
		const row = ['123'];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual(123);
	});

	test('blank', () => {
		const row = [''];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual(INVALID_NUM_ID);
	});
});

describe('string id', () => {
	const attrs = makeAttributes(['s_id']);

	test('exist', () => {
		const row = ['abc'];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual('abc');
	});

	test('blank', () => {
		const row = [''];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual(INVALID_STR_ID);
	});
});

describe('float id', () => {
	const attrs = makeAttributes(['f_id']);

	test('exist', () => {
		const row = ['1.25'];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual(1.25);
	});

	test('blank', () => {
		const row = [''];
		const r = makeRecord(attrs, row);
		expect(r.value.id).toEqual(INVALID_NUM_ID);
	});
});
