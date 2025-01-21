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
    { id: 'owner', title: 'owner' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(id,owner,status){
  const record = [
    {
      id: id,
      owner: owner,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function setInspectionOwner(inspection, user) {
    console.log(`assigning ${inspection} to ${user}...`)
    const ammendUrl = `/inspections/v1/inspections/${inspection}/owner`    
    const options = {
      method: 'PUT',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({owner_id: user})
    };
    const response = await fetch(`${url}${ammendUrl}`,options)
    if(!response.ok) {
        console.log(`error setting owner!`)
    } else {
        console.log(`owner set!`)
    }
    await writer(inspection,user,response.statusText)
};

for (const row of insProc) {
    await setInspectionOwner(row.id, row.owner)
};
