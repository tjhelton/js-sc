import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'
const baseUrl = 'https://api.safetyculture.io'
const getOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: `Bearer ${token}`
  }
}

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'labelId' },
    { id: 'name', title: 'labelName' }
  ],
});

async function writer(id,label){
  const record = [
    {
      name: label,
      id: id
    }
  ]
  await csvWriter.writeRecords(record)
};

async function getLabels() {
  const actionLabels = []
  const response = await fetch(`${baseUrl}/tasks/v1/customer_configuration/action_labels`, getOptions)
  const pResponse = await response.json()
  const labels = pResponse.labels

  for (const label of labels) {
    await writer(label.label_id,label.label_name)
    actionLabels.push(label.label_id)
  }
  return actionLabels
};

async function deleteLabels() {
  const list = await getLabels()
  const response = await fetch(`${baseUrl}/tasks/v1/customer_configuration/action_labels/delete`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({label_ids: list})
    })
    if(!response.ok) {
      console.log('deletion call failed')
    } else {
      console.log('deletion successful')
    }
};

async function main() {
  await deleteLabels()
};

main()
