import neatCSV from 'neat-csv';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const url = 'https://api.safetyculture.io'
const token = process.env.TOKEN

const actions = await fs.readFile('input.csv', 'utf-8')
const actionsCsv = await neatCSV(actions)

const outputCsvPath = 'output.csv'

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'action_id', title: 'action_id' },
    { id: 'site_id', title: 'site_id' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(action,site,status) {
  const record = [
    {
      action_id: action,
      site_id: site,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

function idVal(str) {
  if (str.includes('location')) {
    const uuid = str.split('_')[1]
    return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`
  } else {
    return str
  }
};

async function setSite(action, site) {
  const appendUrl = `/tasks/v1/actions/${action}/site`
  const siteV = idVal(site)
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({site_id: {value: siteV}})
  };
  const response = await fetch(`${url}${appendUrl}`,options)
  if(!response.ok) {
    console.log(`call to set action: ${action} to location: ${siteV} failed`)
  } else {
    console.log(`${action} successfully set to ${siteV}`)
  }
  await writer(action,siteV,response.statusText)
};

for (const row of actionsCsv) {
await setSite(row.action_id,row.site_id);
};
