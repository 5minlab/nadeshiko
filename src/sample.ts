/*
npm run ts-node src/sample.ts
nadeshiko 개발용. 독립적으로 돌아갈수 있도록
*/

import express from 'express';
import nadeshiko from './index';
import Redis from 'ioredis';
import path from 'path';

// TODO modify
const secret = require('../secret/gdrive.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/main.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'main.js'));
});

const sheetID: string = process.env.SHEET_ID!;
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
