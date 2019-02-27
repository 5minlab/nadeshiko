import {
	Attribute,
	makeAttributes,
} from '../Attribute';

describe('Attribute', () => {
	test('integer', () => {
		const f = Attribute.make('i_id');
		expect(f.cast('123')).toEqual(123);
		expect(f.cast(undefined)).toEqual(0);
	});

	test('float', () => {
		const f = Attribute.make('f_rate');
		expect(f.cast('1.5')).toEqual(1.5);
		expect(f.cast(undefined)).toEqual(0);
	});

	test('boolean', () => {
		const f = Attribute.make('b_flag');
		expect(f.cast('TRUE')).toEqual(true);
		expect(f.cast('FALSE')).toEqual(false);
		expect(f.cast('1')).toEqual(true);
		expect(f.cast('0')).toEqual(false);
		expect(f.cast(undefined)).toEqual(false);
	});

	test('string', () => {
		const f = Attribute.make('s_name');
		expect(f.cast('hello')).toEqual('hello');
		expect(f.cast(undefined)).toEqual('');
	});

	test('date', () => {
		const f = Attribute.make('d_date');
		const cases: Array<[string | undefined, Date | null]> = [
			['1995. 9. 7 오전 10:40:52', new Date(1995, 9 - 1, 7, 10, 40, 52)],
			['1995. 9. 7 오후 10:40:52', new Date(1995, 9 - 1, 7, 22, 40, 52)],
			['1995. 11. 23 오후 10:40:52', new Date(1995, 11 - 1, 23, 22, 40, 52)],
			[undefined, null],
		];
		for (const c of cases) {
			expect(f.cast(c[0])).toEqual(c[1]);
		}
	});

	test('raw', () => {
		const f = Attribute.make('r_data');
		expect(f.cast('text')).toEqual('text');
		expect(f.cast(undefined)).toEqual(undefined);
	});

	test('blank', () => {
		expect(() => Attribute.make('')).toThrow();
	});
});

describe('makeAttributes', () => {
	test('ok', () => {
		const row = [
			'i_id',
			'f_rate',
			's_name',
			'b_is_default',
			'd_deleted_at',
			'r_data',
		];
		const attrs = makeAttributes(row);
		expect(attrs).toHaveLength(row.length);
	});
});
