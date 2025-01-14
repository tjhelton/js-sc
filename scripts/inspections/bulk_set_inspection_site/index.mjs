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
    { id: 'site', title: 'site' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(id,site,status){
  const record = [
    {
      id: id,
      site: site,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function assignSite(inspection, site) {
    console.log(`assigning ${inspection} to ${site}...`)
    const ammendUrl = `/inspections/v1/inspections/${inspection}/site`
    const options = {
        method: 'PUT',
        headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({site_id: site})
    }
    const response = await fetch(`${url}${ammendUrl}`,options)
    if(!response.ok) {
        console.log(`error setting ${inspection} to site: ${site}`)
        await writer(inspection,site,response.statusText)
    } else {
        console.log(`${inspection} set to site: ${site}`)
        await writer(inspection,site,response.statusText)
    }
};

for (const row of insProc) {
    await assignSite(row.id, row.site)
};
