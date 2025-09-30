import dotenv from 'dotenv'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config() 

//change activity types as needed
const activityTypes = ['org.users_added', 'org.update_user_seat_type']

const outputCsvPath = 'output.csv'
// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'
const url = 'https://api.safetyculture.io'
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`}
  };

//change csv structure as needed
const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'type', title: 'type' },
    { id: 'verify', title: 'verify' },
    { id: 'eventTime', title: 'eventTime' },
    { id: 'userId', title: 'userId' }
  ],
})

async function writer(type,verify,time,user){
  const record = [
    {
      type: type,
      verify: verify,
      eventTime: time,
      userId: user
    }
  ]
  await csvWriter.writeRecords(record)
};

async function getLogs() {
    let appendUrl = '/feed/activity_log_events'
    let iterationLog = 0
    while(appendUrl !== null){
        const response = await fetch(`${url}${appendUrl}`,options)
        if(!response.ok){
          console.log(`page ${iterationLog} fetch failed: ${url}${appendUrl}`)
          iterationLog++
        } else {
          console.log(`page ${iterationLog} fetched!`)
          iterationLog++
          const jsonData = await response.json()
          for(const item of jsonData.data){
              if(activityTypes.includes(item.type)){
                //change writer arguments to match csvWriter L18
                  await writer(item.type, item.user_id, item.event_at, item.metadata)
          }
          appendUrl = jsonData.metadata.next_page
      }
        }
}};

await getLogs()
