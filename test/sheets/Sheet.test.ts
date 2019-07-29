import { getTableName } from '../../src/sheets/Sheet';

describe('getTableName', () => {
	test('ok', () => {
		expect(getTableName('character!A1:D')).toEqual('character');
		expect(getTableName('game-rule!A1:C')).toEqual('game-rule');
	});
});


