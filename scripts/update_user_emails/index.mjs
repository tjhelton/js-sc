import fs from 'fs/promises';
import neatCsv from 'neat-csv';
import axios from 'axios';
const token = process.argv[2]

async function readCsv(csvName) {
  const csvRaw = (await fs.readFile(csvName)).toString();
  const csv = await neatCsv(csvRaw);
  return csv;
}

//axios API function to process the change
async function setEmail(user,email){
  const url = `https://api.safetyculture.io/users/${user}`
  const data = {"new_email": email}
  const headers = {
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: 'Bearer ' + token
    }}
    await axios.put(url, data, headers)
    .then(response => {
      console.log(user + ' updated to ' + email, response.statusText);
    })
    .catch(error => {
      console.error(user + ' not updated to ' + email, error.status);
    });
}

const csvData = await readCsv('users.csv');

for (const row of csvData) {
  await setEmail(row.userId,row.email)
}