import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const labelsProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'name', title: 'labelName' },
    { id: 'id', title: 'labelId' },
    { id: 'status', title: 'Status'}
  ],
});

async function addLabel(label) {
  const labelName = label
  const labelId = crypto.randomUUID()

  const options = {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      label: 
      {
        label_id: labelId,
        label_name: labelName
      }
    })
  };

  const response = await fetch('https://api.safetyculture.io/tasks/v1/customer_configuration/action_labels/upsert', options)
  return { labelId, labelName, status: response.statusText }

};

async function writer(id,label,status){
  const record = [
    {
      name: label,
      id: id,
      status: status
    }
  ]
  await csvWriter.writeRecords(record)
}

async function main(row){
  const { labelId, labelName, status } = await addLabel(row)
  await writer(labelId,labelName,status)
  console.log(`action label ${row} status: ${status}`)
}

for (const row of labelsProc) {
  await main(row.labelName)
}

console.log('rows processed. see output.csv')
