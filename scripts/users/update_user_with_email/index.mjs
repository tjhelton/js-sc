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

//change messaging as needed, leave keys - as they are used in logic
const messages = {
    searchSuccess: 'found user',
    searchFail: 'user not found',
    updateSucces: 'user updated',
    updateFail: 'user not updated'
};

//change parameters according to what needs to be logged
const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'email', title: 'email' },
    { id: 'userId', title: 'userId' },
    { id: 'seatType', title: 'seatType' },
    { id: 'status', title: 'status' }
  ],
});

//change record keys and function args in accordance with csvWriter
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
    return messages.searchFail
  } else {
    console.log(`found user ${email}`)
    const json = await response.json()
    const userId = json.users[0].id
    return userId
  }
};

async function updateUser(user,seatType){//change args based on onjective
  const ammendUrl = `/users/${user}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({//change payload based on objective
      status: seatType
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    const json = await response.json()
    console.log(`${messages.updateFail}: ${json.message}`)
    return json.message
  } else {
    console.log(`${messages.updateSucces}: [custom messaging]`)
    return messages.updateSucces
  }
};

async function main(email,seatType){//change based on args
  const search = await searchUser(email)
  if(search === messages.searchFail){
    await writer(email,search,seatType,'NOT CHANGED') //change based on other args
  } else {
    if(search !== '') {
      const response = await updateUser(search,seatType)//change based on other args
      await writer(email,search,seatType,response) //change based on other args
    }
  }
};

for (const user of usersProc) {
  await main(user.email,user.seatType) //change based on input.csv
};
