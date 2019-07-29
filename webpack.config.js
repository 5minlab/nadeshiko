// library
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DstBundlePlugin = require('webpack-dts-bundle').default;
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// path
const srcPath = path.resolve(__dirname, './src');
const distPath = path.resolve(__dirname, './dist');

// common library
const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const plugins = [
	new webpack.DefinePlugin({
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	}),
	new DstBundlePlugin({
		name: 'nadeshiko',
		main: path.resolve(__dirname, './dist/index.d.ts'),
		out: path.resolve(__dirname, './dist/main.d.ts'),
	})
];

if (env === 'development') {
	const plugins_development = [
		new ForkTsCheckerWebpackPlugin({
			tslint: false,
			useTypescriptIncrementalApi: true
		}),
		new ForkTsCheckerNotifierWebpackPlugin({
			title: 'TypeScript',
			excludeWarnings: false,
		}),
	]
	for (const p of plugins_development) { plugins.push(p); }
}

const noOptimization = {
	'minimize': false,
	// https://webpack.js.org/guides/build-performance/#avoid-extra-optimization-steps
	'removeAvailableModules': false,
	'removeEmptyChunks': false,
	'splitChunks': false,
};
const optimization = env === 'development' ? noOptimization : undefined;

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
					{
						'loader': 'ts-loader',
						// https://webpack.js.org/guides/build-performance/#typescript-loader
						'options': {
							'transpileOnly': env === 'development' ? true : false,
							'experimentalWatchApi': env === 'development' ? true : false,
						},
					},
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
	'plugins': plugins,
	'node': {
		'__dirname': true,
	},
	'externals': [
		nodeExternals(),
		/^nadeshiko\/.+$/
	],
	'optimization': optimization,
};
