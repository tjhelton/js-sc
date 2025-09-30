import dotenv from 'dotenv'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const url = 'https://api.safetyculture.io'

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'status', title: 'Status'}
  ],
});

async function writer(id,status){
  const record = [
    {
      id: id,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
};

//datafeeds for schedules. adjust url params in ammendUrl as needed
async function fetchAllScheduleIds() {
  let scheduleIds = []
  let ammendUrl = `/feed/schedules?show_active=true&show_finished=true&show_paused=true`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  
  let iteration = 1

  while (ammendUrl !== null) {
    console.log(`fetching page ${iteration}...`)
    const response = await fetch(`${url}${ammendUrl}`, options);
    if(!response.ok) {
      console.log(`error fetching page ${iteration}`)
    } else {
      const json = await response.json()
      if (json.data.length > 0) {
        for(const record of json.data) {
          scheduleIds.push(record.id)
        }
        console.log(`page ${iteration} successfully fetched and added to list!`)
        iteration++
        ammendUrl = json.metadata.next_page
      } else {
       console.log('There are no schedules that match the url parameter')
       break
      }
    }
  } console.log(`list complilation complete!`)
  return scheduleIds
};

async function deleteSchedules(id){
  const ammendUrl = `/schedules/v1/schedule_items/${id}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    const json = await response.json()
    console.log(`error deleting ${id}`)
    await writer(id,json.message)
  } else {
    console.log(`successfully deleted ${id}`)
    await writer(id,response.statusText)
  }
};

async function main(){
  const schedules = await fetchAllScheduleIds()

  for(const schedule of schedules) {
    await deleteSchedules(schedule)
  }
};

await main()
