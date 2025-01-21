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
    { id: 'siteId', title: 'siteId' },
    { id: 'status', title: 'status' }
  ],
});

async function writer(user,site, status){
  const record = [
    {
      userId: user,
      siteId: site,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

function idVal(str) {
  if (str.includes('user')) {
    const uuid = str.split('_')[1]
    return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`
  } else {
    return str
  }
};

async function removeMembership(user,site) {
  const newUser = idVal(user)
  const ammendUrl = `/directory/v1/user/${newUser}/folders?folder_ids=${site}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`error removing ${newUser} from ${site}`) 
  } else {
    console.log(`removed ${newUser} from ${site}`)
  }
  await writer(newUser,site,response.statusText)
};

for(const user of usersProc) {
  await removeMembership(user.userId,user.siteId)
};
