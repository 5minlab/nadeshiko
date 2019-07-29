import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json'
import copy from 'rollup-plugin-copy'
import builtins from 'builtin-modules'


const pkg = require('./package.json')
const external = Object.keys(pkg.dependencies);

const libraryName = 'nadeshiko'

const globals = {
	'express': 'express',
	'dayjs': 'dayjs',
	'yup': 'yup',
	'http-errors': 'createError',
	'js-yaml': 'yaml',
	'lodash': '_',
	'googleapis': 'googleapis',
	'path': 'path',
	'assert': 'assert',
}

export default {
	input: `src/${libraryName}.ts`,
	output: [
		{
			file: pkg.main,
			name: camelCase(libraryName),
			format: 'umd',
			sourcemap: true,
			globals
		},
		{
			file: pkg.module,
			format: 'es',
			sourcemap: true,
			globals,
		},
	],
	// Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
	external: [
		...builtins,
		...external,
	],
	watch: {
		include: 'src/**',
	},
	plugins: [
		nodeBuiltins(),
		nodeGlobals(),
		// Allow json resolution
		json(),
		// Compile TypeScript files
		typescript({
			useTsconfigDeclarationDir: true,
			// Only enable this if you need it
			// (Error: Unknown object type "asyncfunction" for example)
			// and make sure to run with clean: true once in a while and definitely before a release. (See #105)
			objectHashIgnoreUnknownHack: true,
		}),
		// Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
		commonjs(),
		// Allow node_modules resolution, so you can use 'external' to control
		// which external modules to include in the bundle
		// https://github.com/rollup/rollup-plugin-node-resolve#usage
		resolve({}),

		// Resolve source maps to the original source
		sourceMaps(),

		copy({
			targets: [
				{ src: ['public/index.html', 'public/main.js'], dest: 'dist/public' },
			]
		}),
	],
}
