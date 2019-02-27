# nadeshiko

Cache layer for Google Sheet

[![Build Status](https://travis-ci.org/5minlab/nadeshiko.svg?branch=master)](https://travis-ci.org/5minlab/nadeshiko)
[![codecov](https://codecov.io/gh/5minlab/nadeshiko/branch/master/graph/badge.svg)](https://codecov.io/gh/5minlab/nadeshiko)

## usage

### make sheet

make metadata sheet.
`metadata-references` and `metadata-constraints`

reference table is ...

|s_table	|s_range	|s_sheet|
|----|---|---|
|testdata-foo	|A1:E	|spreadsheet-id|
|testdata-bar	|A1:B	|spreadsheet-id|

constraint table is...

|type	|first table	|first attribute	|second table	|second attribute|
|----|-------------|-----------------|------------|---------------|
|fk|	testdata-bar|	parent_id	|testdata-foo|	id|

make data sheet.
referenced by reference table.
sample sheet is ... (sheet name = testdata-foo)

|i_id|	f_rate|	s_name|	b_is_default|	d_deleted_at|
|-----|--------|------|-----------|------------|
|1|	1.5|	testdb|	TRUE| |
|2	|2.5	|bar|	FALSE	| |
| 3|	4.125	|spam|	FALSE	|1995. 9. 7 오전 10:40:52|

supported type
* integer: prefix `i_`. default value is `0`
* float: prefix `f_`. default value is `0.0`
* string: prefix `s_`. default value is `''`
* boolean: prefix `b_`. default value is `false`
* date: prefix `d_`. default value is `null`

### service account key

1. make service account key from google api console
2. get `client_email` from service account key
3. add read permission to `client_email`

### execute server

prepare redis server.
then access http://127.0.0.1:4000/static

```js
const express = require('express');
const nadeshiko = require('nadeshiko');
const Redis = require('ioredis');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/hello/', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'node_modules', 'nadeshiko', 'src', 'public', 'index.html'));
});
app.get('/hello/main.js', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'node_modules', 'nadeshiko', 'src', 'public', 'main.js'));
});
app.use('/hello', nadeshiko({
	redis: new Redis(6379, '127.0.0.1'),
	metadataSheetId: '<TODO input metadata sheet id>',
	dataPath: path.resolve(__dirname, 'tmp'),
	serviceKey: {
		client_email: '<TODO service account key>',
		private_key: '<TODO service account key>',
	},
}));

const port = 4000;
app.listen(port, () => {
    console.log(`listen port=${port}`);
});
```
