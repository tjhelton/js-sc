import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import dotenv from 'dotenv'
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const url = 'https://api.safetyculture.io'

const setId = process.env.GRS

const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      {id: 'label', title: 'label'},
      {id: 'id', title: 'id'}
    ]
});

async function writer(id,label){
  const record = [
    {
      label: label,
      id: id,
    }
  ]
  await csvWriter.writeRecords(record)
};

async function getResponses(id) {
  const ammendUrl = `/response_sets/${id}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    console.log(`error fetching ${id}...`)
  } else {
    const json = await response.json()
    console.log(`response set ${json.name} fetched successfully!`)
    return json.responses
  }
};

async function main(id) {
  const payload = await getResponses(id)
  
  for (const item of payload) {
    await writer(item.id,item.label)
  }
};

await main(setId)
