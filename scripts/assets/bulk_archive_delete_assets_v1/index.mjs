import neatCsv from 'neat-csv'
import fs from 'fs/promises'
import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const assets = await fs.readFile('input.csv','utf8')
const assetCsv = await neatCsv(assets)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'asset_id', title: 'asset_id' },
    { id: 'status', title: 'status' },
    { id: 'message', title: 'message'}
  ],
});

async function writer(id,status,message){
  const record = [
    {
      asset_id: id,
      status: status,
      message: message
    }
  ]
  await csvWriter.writeRecords(record)
};

const url = 'https://api.safetyculture.io'

async function archiveAsset(asset){
  const ammendUrl = `/assets/v1/assets/${asset}/archive`
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    await writer(asset,response.statusText,'archive failed. record skipped.')
    console.log(`${asset} archive failed. skipping this record...`)
    return 'fail'
  } else {
    console.log(`${asset} archived!`)
    return 'archived'
  }
};

async function deleteAsset(asset) {
  const ammendUrl = `/assets/v1/assets/${asset}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      authorization: 'Bearer ' + token
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    await writer(asset,response.statusText,'archive successful. deletion failed.')
    console.log(`${asset} deletion failed...`)
  } else {
    await writer(asset,response.statusText,'asset successfully deleted.')
    console.log(`${asset} deleted...`)
  }
};

async function main(row) {
  const archive = await archiveAsset(row)
  if(archive === 'archived') {
    await deleteAsset(row)
  } else {
    //skip row
  }
};

for (const row of assetCsv) {
    await main(row.asset_id)
};
