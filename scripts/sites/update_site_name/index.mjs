import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const url = 'https://api.safetyculture.io'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const sitesProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'siteId' },
    { id: 'siteOldName', title: 'siteOldName' },
    { id: 'siteNewName', title: 'siteNewName' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(siteId,siteOldName,siteNewName,status){
  const record = [
    {
      id: siteId,
      siteOldName: siteOldName,
      siteNewName: siteNewName,
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

async function getName(id) {
  const idValidated = await idVal(id)
  const ammendUrl = `/directory/v1/folder/${idValidated}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`, options)
  if(response.status === '404'){
    console.log(`${id} not found...`)
    return 'name not found'
  } else if (!response.ok) {
    console.log(`error fetching ${id}`)
    return 'error fetching name'
  } else {
    const json = await response.json()
    return json.folder.name
  }
};

async function changeName(id,newName) {
  const idValidated = idVal(id)
  const oldName = await getName(idValidated)
  const ammendUrl = `/directory/v1/folder/${idValidated}`
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({name: {val: newName}}),
  };
  
  const response = await fetch(`${url}${ammendUrl}`,options)
  const json = await response.json()
  if (!response.ok) {
    console.log(`error renaming site ${oldName} to ${newName}!`)
    await writer(id,oldName,newName,json.message)
  } else {
    console.log(`renamed site ${oldName} to ${newName}!`)
    await writer(id,oldName,newName,response.statusText)
  } 
};

for (const site of sitesProc) {
  await changeName(site.siteId,site.newName)
};
