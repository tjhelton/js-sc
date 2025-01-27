import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const url = 'https://api.safetyculture.io'

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const usersProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'userId', title: 'userId' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(user, status){
  const record = [
    {
      userId: user,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function deactivateUser(user){
  const ammendUrl = `/users/${user}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(
      {
        status: 'inactive'
      }
    ),
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error deactivating ${user}`)
    await writer(user,json.message)
  } else {
    console.log(`${user} deactivated!`)
    await writer(user,response.statusText)
  }
};

for(const user of usersProc) {
  await deactivateUser(user.userId)
};
