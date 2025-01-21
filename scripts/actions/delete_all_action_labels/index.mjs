import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN
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
    { id: 'name', title: 'labelName' },
    { id: 'status', title: 'status'}
  ],
});

async function writer(id,label,status){
  const record = [
    {
      name: label,
      id: id,
      status: status
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
