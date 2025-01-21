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
    { id: 'groupId', title: 'groupId' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(email, group, status){
  const record = [
    {
      email: email,
      groupId: group,
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
  if (!response.ok) {
    console.log(`error searching for ${email}`)
    return 'search error'
  } else {
    console.log(`${email}: user found!`)
    const json = await response.json()
    const userId = json.users[0].id
    return userId
  }
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
    return 'error adding user to group'
  } else {
    console.log(`${user} added to ${group}...`)
    return 'user added to group'
  }
};

async function main(email,group) {
  const userId = await searchUser(email)
  if(userId === 'search error') {
    await writer(email,group,'email not found')
  } else {
    const response = await groupUsers(userId,group)
    await writer(email,group,response)
  }
};

for(const user of usersProc) {
  await main(user.email,user.groupId)
};
