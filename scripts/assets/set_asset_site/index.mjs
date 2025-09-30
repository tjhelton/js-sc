import neatCSV from 'neat-csv';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const url = 'https://api.safetyculture.io'
// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const assets = await fs.readFile('input.csv', 'utf-8')
const assetsCsv = await neatCSV(assets)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'asset_id', title: 'asset_id' },
    { id: 'site_id', title: 'site_id' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(asset,site,status) {
  const record = [
    {
      asset_id: asset,
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

async function setSite(asset, site) {
  const appendUrl = `/assets/v1/assets/${asset}`
  const siteV = idVal(site)
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({site: {id: siteV}})
  };

  const response = await fetch(`${url}${appendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`call to set action: ${asset} to location: ${siteV} failed`)
    await writer(asset,siteV,json.message)
  } else {
    console.log(`${asset} successfully set to ${siteV}`)
    await writer(asset,siteV,response.statusText)
  }
};

for (const row of assetsCsv) {
  await setSite(row.asset_id,row.site_id);
};
