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
    { id: 'seat', title: 'seat' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(user, seat, status){
  const record = [
    {
      userId: user,
      seat: seat,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function activateUser(user,seat){
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
        status: 'active',
        seat_type: seat
      }
    ),
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error activating ${user}`)
    await writer(user,seat,json.message)
  } else {
    console.log(`${user} activated as ${seat}!`)
    await writer(user,seat,response.statusText)
  }
};

for(const user of usersProc) {
  await activateUser(user.userId,user.seatType)
};
