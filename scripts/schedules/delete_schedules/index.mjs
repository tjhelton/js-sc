import neatCsv from 'neat-csv'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const url = 'https://api.safetyculture.io'

const schedules = await fs.readFile('input.csv', 'utf8')
const schedCsv = await neatCsv(schedules)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'status', title: 'Status'}
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

async function deleteSched(id) {
  const ammendUrl = `/schedules/v1/schedule_items/${id}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
      const response = await fetch(`${url}${ammendUrl}`, options)
      if(!response.ok) {
        const json = await response.json()
        console.log(`error deleting ${id}: ${response.status}: ${response.statusText}`)
        await writer(id,json.message)
      } else {
        console.log(`${id} has been deleted!`)
        await writer(id,response.statusText)
      }
};

for (const row of schedCsv) {
  await deleteSched(row.id)
};
