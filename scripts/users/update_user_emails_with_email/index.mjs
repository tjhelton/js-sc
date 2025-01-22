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
    { id: 'oldEmail', title: 'oldEmail' },
    { id: 'newEmail', title: 'newEmail' },
    { id: 'status', title: 'status' }
  ],
});

async function writer(oldEmail,newEmail, status){
  const record = [
    {
      oldEmail: oldEmail,
      newEmail: newEmail,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

async function searchUser(email) {
  const ammendUrl = '/users/search';
  const options = {
    method: "POST",
    headers: {
      'accept' : 'application/json',
      'content-type': 'application/json',
      'authorization' : 'Bearer ' + token
  },
    body: JSON.stringify({'email':[email]})
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  const json = await response.json()
  const userId = json.users[0].id
  if (userId === null) {
    console.log(`error searching for ${email}`)
    return 'search error'
  } else {
    console.log(`${email}: user found!`)
    return userId
  }
};

async function updateUser(user,newEmail) {
  const ammendUrl = `/users/${user}`
  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      new_email: newEmail
    })
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error updating user email...`)
    return json.message
  } else {
    console.log(`${user} email updated!`)
    return 'SUCCESS'
  }
};

async function main(oldEmail,newEmail) {
  const searchedUser = await searchUser(oldEmail)
  if(searchedUser === 'search error') {
    console.log(`error searching for ${oldEmail}`)
    await writer(oldEmail,newEmail,'Old email not found...')
  } else {
    const updateStatus = await updateUser(searchedUser,newEmail)
    await writer(oldEmail,newEmail,updateStatus)
  }
};

for (const user of usersProc){
  await main(user.oldEmail,user.newEmail)
};
