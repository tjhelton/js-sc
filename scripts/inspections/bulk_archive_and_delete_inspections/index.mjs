import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const insProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const url = 'https://api.safetyculture.io'

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'archive', title: 'archive'},
    { id: 'deletion', title: 'deletion'}
  ],
});

async function writer(id,archive,deletion){
  const record = [
    {
      id: id,
      archive: archive,
      deletion: deletion
    }
  ]
  await csvWriter.writeRecords(record)
};

async function archiveIns(ins) {
  const ammendUrl = `/inspections/v1/inspections/${ins}/archive`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`${ins} failed to archive...`)
    return response.statusText
  } else {
    console.log(`${ins} archived...`)
    return response.statusText
  }
};

async function deleteIns(ins) {
  const ammendUrl = `/inspections/v1/inspections/${ins}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`${ins} failed to delete...`)
    return response.statusText
  } else {
    console.log(`${ins} deleted...`)
    return response.statusText
  }
};

async function main (ins) {
  const archival = await archiveIns(ins)
  const deletion = await deleteIns(ins)

  await writer(ins,archival,deletion)
};

for (const row of insProc) {
  await main(row.id)
};
