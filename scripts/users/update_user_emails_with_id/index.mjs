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
    { id: 'newEmail', title: 'newEmail' },
    { id: 'status', title: 'status' }
  ],
});

async function writer(user,newEmail,status){
  const record = [
    {
      userId: user,
      newEmail: newEmail,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function updateUser(user,newEmail) {
  const ammendUrl = `/users/${user}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      new_email: newEmail
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error updating ${user} email...`)
    await writer(user,newEmail,json.message)
  } else {
    console.log(`${user} email updated!`)
    await writer(user,newEmail,response.statusText)
  }
};

for (const user of usersProc){
  await updateUser(user.userId,user.newEmail)
};
