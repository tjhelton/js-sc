import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const url = 'https://api.safetyculture.io'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const usersProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'userId', title: 'userId' },
    { id: 'siteId', title: 'siteId' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(user, site, status){
  const record = [
    {
      userId: user,
      siteId: site,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function addUser(user,site) {
  const ammendUrl = '/directory/v1/users/folders/membership'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({assignments: {[site]: {user_ids: [user]}}})
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error adding ${user} to ${site}`)
    await writer(user,site,json.message)
  } else {
    console.log(`${user} added to ${site}`)
    await writer(user,site,response.statusText)
  }
};

for(const user of usersProc) {
  if(user.siteId !== 'no_site'){
    await addUser(user.userId,user.siteId)
  }
};
