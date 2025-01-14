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
    { id: 'siteName', title: 'siteName' },
    { id: 'parentId', title: 'parentId' },
    { id: 'parentName', title: 'parentName' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(siteId,siteName,parentId,parentName,status){
  const record = [
    {
      id: siteId,
      siteName: siteName,
      parentId: parentId,
      parentName: parentName,
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
    return 'parent id not found'
  } else if (!response.ok) {
    console.log(`error fetching ${id}`)
    return 'error fetching parent'
  } else {
    const json = await response.json()
    return json.folder.name
  }
};

async function createSites(siteName,parentId){
  const ammendUrl = `/directory/v1/folder`
  const parentIdV = await idVal(parentId)
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: siteName,
      meta_label: 'location',
      ...(parentIdV && { parent_id: parentIdV })
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`error creating site ${siteName}`)
  } else if (!parentId) {
    const json = await response.json()
    const siteId = json.folder.id
    await writer(siteId,siteName,'no parent','no parent',response.statusText)
    console.log(`successfully created ${siteName}!`)
  } else {
    const json = await response.json()
    const siteId = json.folder.id
    const parentName = await getName(parentId)
    await writer(siteId,siteName,parentIdV,parentName,response.statusText)
    console.log(`successfully created ${siteName}!`)
  }
};

for (const sites of sitesProc) {
  await createSites(sites.siteName,sites.parentId)
};
