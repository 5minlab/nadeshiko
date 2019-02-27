import { filterVersions, makeVersionInfo } from '../versions';

describe('filterVersions', () => {
	test('ok', () => {
		const input = [
			'20190227-040227',
			'.gitkeep',
		];
		const output = filterVersions(input);
		expect(output).toEqual(['20190227-040227']);
	});
});

describe('makeVersionInfo', () => {
	test('ok', () => {
		const input = [
			'character.yaml',
			'game-rule.yaml',
			'metadata-constraints.yaml',
			'metadata-references.yaml',
		];
		const info = makeVersionInfo(input);
		expect(info).toEqual({
			metadata: [
				'metadata-constraints',
				'metadata-references',
			],
			contents: [
				'character',
				'game-rule',
			],
		});
	});
});
