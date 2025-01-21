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

async function fetchGroups(user){
  let groups = []
  const ammendUrl = `/accounts/organisation/v1/accounts/user/${user}/groups`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`error fetching groups for ${user}`)
  } else {
    console.log(`groups fetched for ${user}`)
    const json = await response.json()
    for (const group of json.groups) {
      groups.push(group.id)
    }
  }
  return groups
};

async function removeGroupMemberShip(user,group){
  const ammendUrl = `/groups/${group}/users/${user}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`error removing ${user} from ${group}...`)
  } else {
    console.log(`${user} removed from ${group}`)
  }
};

async function main(user) {
  const groupList = await fetchGroups(user)
  for(const group of groupList) {
    await removeGroupMemberShip(user,group)
  }
  await writer(user,'user removed from all groups')
};

for(const user of usersProc) {
  await main(user.userId)
};
