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
    { id: 'seatType', title: 'seatType' },
    { id: 'status', title: 'status' }
  ],
});

async function writer(userId,seatType,status){
  const record = [
    {
      userId: userId,
      seatType: seatType,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function updateSeat(user,seatType){
  const ammendUrl = `/users/${user}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      seat_type: seatType
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    const json = response.json()
    console.log(`error updating ${user} seat to ${seatType}`)
    await writer(user,seatType,json)
  } else {
    console.log(`${user} seat updated to ${seatType}`)
    await writer(user,seatType,response.statusText)
  }
};

for (const user of usersProc) {
  await updateSeat(user.userId,user.seatType)
};
