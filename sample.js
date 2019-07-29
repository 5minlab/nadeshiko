const express = require('express');
require('express-async-errors');
const Redis = require('ioredis');
const path = require('path');
const nadeshiko = require('./dist/lib/nadeshiko');

// TODO modify
const secret = require('./secret/gdrive.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/index.html'));
});
app.get('/main.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public/main.js'));
});

const redis = new Redis(6379, '127.0.0.1');
const prefix = 'nadeshiko-dev';

const sheetID = process.env.SHEET_ID;
app.use('/', nadeshiko.makeRouter({
	redis,
	metadataSheetId: sheetID,
	dataPath: path.resolve(__dirname, 'tmp'),
	serviceKey: {
		client_email: secret.client_email,
		private_key: secret.private_key,
	},
	prefix,
}));

const port = 3000;
app.listen(port, async () => {
	console.log(`listen port=${port}`);

	try {
		// get data
		const table = new nadeshiko.TableCache(redis, prefix);
		const ndsk = new nadeshiko.Nadeshiko(redis, prefix);
		const key = ndsk.key('foo');
		const items = await ndsk.mget('foo');
		const item = await ndsk.get('foo', 1);
		console.log({ key, items, item });

	} catch (err) {
		console.error(err);
	}
});
