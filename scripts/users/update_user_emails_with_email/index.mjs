//SetUp
import neatCSV from 'neat-csv';
import fs from 'fs/promises';
import winston from 'winston';

const logger = winston.createLogger({
  level:'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'user_updates.log',
      level: 'info'
  }),
  ],
});
const token = process.argv[2]
//we use the search endpoint to get a user id with an email, then use the update endpoint for that id
async function updateUsers(email,newEmail){
  const searchEndpoint = 'https://api.safetyculture.io/users/search';
  const searchOptions = {
    method: "POST",
    headers: {
      'accept' : 'application/json',
      'content-type': 'application/json',
      'authorization' : 'Bearer ' + token
  },
    body: JSON.stringify({'email':[email]})
  };
  const userEndpoint = 'https://api.safetyculture.io/users/'
  const userOptions = {
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
await fetch (searchEndpoint, searchOptions)
.then(response => response.json())
.then(data => {
  if (data.users[0] === undefined) {
    logger.log('info', `No user ID found for ${email}...`)
  } else {
    const userId = data.users[0].id
    const updatedUserEndpoint = userEndpoint + userId;
    return fetch(updatedUserEndpoint, userOptions)
    .then((response) => {
      logger.log('info', email + " " + 'changed to ' + newEmail + ' ' + response.statusText)
    })
    .catch(error => {
      logger.log('error', email + " " + error.message);
    });
  }
})
};
//Reads the appropriate CSV in the root of the script location.
async function reader(csvName) {
  const csvRaw = (await fs.readFile(csvName)).toString();
  const csv = await neatCSV(csvRaw);
  return csv;
}
//create user array outside of reader function
const users = await reader('userUpdate.csv');

for (const row of users) {
  await updateUsers(row.email,row.new_email);
};
