import {
	Attribute,
	makeAttributes,
} from '../../src/sheets/Attribute';

describe('Attribute#cast', () => {
	it('integer', () => {
		const f = Attribute.make('i_id');
		expect(f.cast('123')).toEqual(123);
		expect(f.cast(undefined)).toEqual(0);
	});

	it('float', () => {
		const f = Attribute.make('f_rate');
		expect(f.cast('1.5')).toEqual(1.5);
		expect(f.cast(undefined)).toEqual(0);
	});

	it('boolean - true', () => {
		const f = Attribute.make('b_flag');
		const cases = [
			'TRUE',
			't',
			'1',
		];
		for (const c of cases) {
			expect(f.cast(c)).toEqual(true);
		}
	});

	it('boolean - false', () => {
		const f = Attribute.make('b_flag');
		const cases = [
			'FALSE',
			'f',
			'0',
			'???',
			undefined,
		];
		for (const c of cases) {
			expect(f.cast(c)).toEqual(false);
		}
	});

	it('string', () => {
		const f = Attribute.make('s_name');
		expect(f.cast('hello')).toEqual('hello');
		expect(f.cast(undefined)).toEqual('');
	});

	it('date', () => {
		const f = Attribute.make('d_date');
		const cases: Array<[string | undefined, Date | null]> = [
			['1995. 9. 7 오전 10:40:52', new Date(1995, 9 - 1, 7, 10, 40, 52)],
			['1995. 9. 7 오후 10:40:52', new Date(1995, 9 - 1, 7, 22, 40, 52)],
			['1995. 11. 23 오후 10:40:52', new Date(1995, 11 - 1, 23, 22, 40, 52)],
			[undefined, null],
			['unparsable', null],
		];
		for (const c of cases) {
			expect(f.cast(c[0])).toEqual(c[1]);
		}
	});

	it('raw', () => {
		const f = Attribute.make('r_data');
		expect(f.cast('text')).toEqual('text');
		expect(f.cast(undefined)).toEqual(undefined);
	});

	it('comment', () => {
		const f = Attribute.make('_comment');
		expect(f.cast('content')).toBeUndefined();
		expect(f.cast(undefined)).toBeUndefined();
	});

	it('blank', () => {
		expect(() => Attribute.make('')).toThrow();
	});

	it('unknown', () => {
		expect(() => Attribute.make('?_foo')).toThrow();
	});
});

describe('makeAttributes', () => {
	it('ok', () => {
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
