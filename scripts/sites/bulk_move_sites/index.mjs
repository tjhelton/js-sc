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
    { id: 'siteName', title: 'siteName' },
    { id: 'newParentId', title: 'newParentId' },
    { id: 'newParentName', title: 'newParentName' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(siteId,siteName,parentId,parentName,status){
  const record = [
    {
      id: siteId,
      siteName: siteName,
      newParentId: parentId,
      newParentName: parentName,
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
    return 'site id not found'
  } else if (!response.ok) {
    console.log(`error fetching ${id}`)
    return 'error fetching name'
  } else {
    const json = await response.json()
    return json.folder.name
  }
};

async function moveSites(siteId,parentId){
  const ammendUrl = `/directory/v1/folders/move`
  const siteIdV = await idVal(siteId)
  const parentIdV = await idVal(parentId)
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ids: [siteIdV],
      ...(parentIdV && { parent_id: parentIdV })
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  const json = await response.json()
  if(!response.ok) {
    console.log(`error moving site!`)
    await writer(siteId,'move error',parentId,'move error',json.message)
  } else if (!parentId) {
    const siteName = await getName(siteIdV)
    await writer(siteId,siteName,'orphan','orphan',response.statusText)
    console.log(`successfully removed parents from ${siteName}!`)
  } else {
    const siteName = await getName(siteIdV)
    const parentName = await getName(parentIdV)
    await writer(siteId,siteName,parentIdV,parentName,response.statusText)
    console.log(`successfully moved ${siteName} to ${parentName}!`)
  }
};

for (const sites of sitesProc){
  await moveSites(sites.siteId,sites.parentId)
};
