import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const insProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const url = 'https://api.safetyculture.io'

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(id,status){
  const record = [
    {
      id: id,
      status: status
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
  } else {
    console.log(`${ins} archived...`)
  }
  const json = await response.json()
  await writer(json.inspection_id,response.statusText)
};

for (const row of insProc) {
  await archiveIns(row.id)
};
