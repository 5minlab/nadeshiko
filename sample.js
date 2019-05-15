const express = require('express');
require('express-async-errors');
const Redis = require('ioredis');
const path = require('path');
const nadeshiko = require('./dist/main');

// TODO modify
const secret = require('./secret/gdrive.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'src/public/index.html'));
});
app.get('/main.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'src/public/main.js'));
});

const sheetID = process.env.SHEET_ID;
app.use('/', nadeshiko({
	redis: new Redis(6379, '127.0.0.1'),
	metadataSheetId: sheetID,
	dataPath: path.resolve(__dirname, 'tmp'),
	serviceKey: {
		client_email: secret.client_email,
		private_key: secret.private_key,
	},
	prefix: 'nadeshiko-dev',
}));

const port = 4000;
app.listen(port, () => {
	console.log(`listen port=${port}`);
});
