import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const url = 'https://api.safetyculture.io'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const sitesProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'siteId' },
    { id: 'status', title: 'status'}
  ],
});

function idVal(str) {
    if (str.includes('location')) {
      const uuid = str.split('_')[1]
      return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`
    } else {
      return str
    }
  };

async function writer(siteId,status){
  const record = [
    {
      id: siteId,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

async function deleteSites(site) {
    const ammendUrl = `/directory/v1/folders?folder_ids=${site}`
    const response = await fetch(`${url}${ammendUrl}`,options)
    const id = await idVal(site)
    if(!response.ok){
        console.log(`error deleting ${id}. see output`)
        const json = await response.json()
        await writer(id,json.message)
    } else {
        console.log(`deleted ${id}!`)
        await writer(id,response.statusText)
    }
};

for(const row of sitesProc){
    await deleteSites(row.siteId)
};
