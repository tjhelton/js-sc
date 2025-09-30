import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const inputProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const url = 'https://api.safetyculture.io'

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'name', title: 'groupName' },
    { id: 'id', title: 'groupId' },
    { id: 'status', title: 'Status'}
  ],
});

async function writer(name,groupId,status){
  const record = [
    {
      name: name,
      id: groupId,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function createGroups(name) {
  const ammendUrl = '/groups'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({name: name})
  };
  const response = await fetch(`${url}${ammendUrl}`,options)
  const json = await response.json()
  if(!response.ok) {
    console.log(`error creating group ${name}`)
    await writer(name,'no id',json.message)
  } else {
    console.log(`group ${name} created with ${json.id}`)
    await writer(name,`${json.id}`,response.statusText)
  }
};

for (const row of inputProc) {
await createGroups(row.groupName);
};
