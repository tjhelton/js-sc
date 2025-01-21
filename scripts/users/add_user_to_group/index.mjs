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
    { id: 'groupId', title: 'groupId' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(user, group, status){
  const record = [
    {
      userId: user,
      groupId: group,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function groupUsers(user,group) {
  const ammendUrl = `/groups/${group}/users/v2`
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({user_id: user}),
  };

  const response = await fetch(`${url}${ammendUrl}`, options)
  if (!response.ok) {
    console.log(`error adding ${user} to ${group}...`)
  } else {
    console.log(`${user} added to ${group}...`)
  }
  await writer(user,group,response.statusText)
};

for (const row of usersProc) {
  await groupUsers(row.userId,row.groupId)
};
