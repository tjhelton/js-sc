//SetUp
import neatCSV from 'neat-csv';
import fs from 'fs/promises';
import winston from 'winston';
//Logger
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
const token = process.env.ACCESS_TOKEN
//fuunction that searches via email and sets user to inactive
async function updateUsers(id,seatType,status){
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
      seat_type: seatType,
      status: status
    })
  };
  const updatedUserEndpoint = userEndpoint + id;
  await fetch(updatedUserEndpoint, userOptions)
.then((response) => {
  console.log(`updated ${id}!`)
  logger.log('info', id + " " + response.statusText)
})
.catch(error => {
  logger.log('error', id + " " + error.message);
});
}
;
//Reads the appropriate CSV in the root of the script location.
async function reader(csvName) {
  const csvRaw = (await fs.readFile(csvName)).toString();
  const csv = await neatCSV(csvRaw);
  return csv;
}
//create user array outside of reader function
const csv1 = await reader('userUpdate.csv');
//Performs the JS API function for each user in the CSV.
for (const row of csv1) {
  await updateUsers(row.user_id,row.seat_type,row.status);
};
