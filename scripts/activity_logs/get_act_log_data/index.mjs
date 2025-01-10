import dotenv from 'dotenv'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config() 

//change activity types as needed
const activityTypes = ['action.delete_action_label', 'action.create_action_label']

const outputCsvPath = 'output.csv'
const token = process.env.TOKEN
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
    { id: 'eventTime', title: 'eventTime' },
    { id: 'userId', title: 'userId' }
  ],
})

async function writer(type,time,user){
  const record = [
    {
      type: type,
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
                  await writer(item.type, item.event_at, item.user_id)
          }
          appendUrl = jsonData.metadata.next_page
      }
        }
}};

await getLogs()
