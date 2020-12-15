const express = require('express');
const { readData, writeData } = require('./utils');
const app = express();

const port = 7355;
const hostname = 'localhost';

let recordList = [];

const isEqual = (obj1, obj2) => {
  if (obj1.patientName !== obj2.patientName) {
    return false;
  }

  if (obj1.date.getTime() !== obj2.date.getTime()) {
    return false;
  }

  return true;
};

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.options('/*', (request, response) => {
  response.statusCode = 200;
  response.send('OK');
});


app.post('/records', async (request, response) => {
  const record = request.body;
  record.date = new Date(record.date);
  recordList.push(record);
  await writeData(recordList);
  response.status(201).send('OK');
});

app.patch('/records', async (request, response) => {
  const { record, newName } = request.body;
  record.date = new Date(record.date);
  recordList = recordList.map((rec) => (isEqual(rec, record) ? {
    ...rec,
    patientName: newName
  } : rec));
  await writeData(recordList);
  response.status(200).send('OK');
})

app.delete('/records', async (request, response) => {
  const record = request.body;
  record.date = new Date(record.date);
  recordList = recordList.filter((rec) => (!isEqual(rec, record)));
  await writeData(recordList);
  response.status(200).send('OK');
});

app.get('/records', async (request, response) => {
  recordList = await readData();
  response.setHeader('Content-Type', 'application/json');
  response.json(recordList);
});

app.listen(port, hostname, (msg) => {
  if (msg) {
    console.log(msg);
  }
});
