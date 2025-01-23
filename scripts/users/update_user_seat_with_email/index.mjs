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
    { id: 'email', title: 'email' },
    { id: 'userId', title: 'userId' },
    { id: 'seatType', title: 'seatType' },
    { id: 'status', title: 'status' }
  ],
});

async function writer(email,userId,seatType,status){
  const record = [
    {
      email: email,
      userId: userId,
      seatType: seatType,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function searchUser(email){
  const ammendUrl = '/users/search'
  const options = {
    method: "POST",
    headers: {
      'accept' : 'application/json',
      'content-type': 'application/json',
      'authorization' : `Bearer ${token}`
  },
    body: JSON.stringify({'email':[email]})
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`error searching ${email}`)
    return 'SEARCH FAILED'
  } else {
    console.log(`found user ${email}`)
    const json = await response.json()
    const userId = json.users[0].id
    return userId
  }
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
    const json = await response.json()
    console.log(`error updating ${user} seat to ${seatType}`)
    return json.message
  } else {
    console.log(`${user} seat updated to ${seatType}`)
    return 'UPDATED SEAT'
  }
};

async function main(email,seatType){
  const search = await searchUser(email)
  if(search === 'SEARCH FAILED'){
    await writer(email,search,seatType,'NOT CHANGED')
  } else {
    if(search !== '') {
      const response = await updateSeat(search,seatType)
      await writer(email,search,seatType,response)
    }
  }
};

for (const user of usersProc) {
  await main(user.email,user.seatType)
};
