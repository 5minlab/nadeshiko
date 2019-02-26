// library
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DstBundlePlugin = require('webpack-dts-bundle').default;
const TerserPlugin = require('terser-webpack-plugin');

// path
const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

// common library
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
	// common
	'devtool': 'source-map',
	'resolve': {
		'extensions': [
			'.js',
			'.json',
			'.ts',
			'.tsx',
		],
	},
	'module': {
		'rules': [
			{
				'test': /\.tsx?$/,
				'use': [
					'ts-loader',
				],
			},
		],
	},
	'mode': env,
	'target': 'node',

	// nadeshiko
	'entry': path.resolve(srcPath, 'index.ts'),
	'output': {
		'path': distPath,
		'filename': 'main.js',
		'library': 'nadeshiko',
		'libraryTarget': 'umd',
	},
	'plugins': [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new DstBundlePlugin({
			name: 'nadeshiko',
			main: path.resolve(__dirname, './dist/index.d.ts'),
			out: path.resolve(__dirname, './dist/main.d.ts'),
		})
	],
	'node': {
		'__dirname': true,
	},
	'externals': [
		nodeExternals(),
		/^nadeshiko\/.+$/
	]
};
