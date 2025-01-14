import fs from 'fs/promises';
import dotenv from 'dotenv';
import neatCsv from 'neat-csv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const token = process.env.TOKEN

const inputCsvPath = await fs.readFile('input.csv', 'utf8')
const insProc = await neatCsv(inputCsvPath)

const outputCsvPath = 'output.csv';

const url = 'https://api.safetyculture.io'

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'id', title: 'id' },
    { id: 'archive', title: 'archive'},
    { id: 'unarchive', title: 'unarchive'}
  ],
});

async function writer(id,archive,unarchive){
  const record = [
    {
      id: id,
      archive: archive,
      unarchive: unarchive
    }
  ]
  await csvWriter.writeRecords(record)
};

async function archive(audit) {
    console.log(`archiving ${audit}...`)
    const ammendUrl = `/inspections/v1/inspections/${audit}/archive`
    const options =         {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${token}`
        }
    };
    const response = await fetch(`${url}${ammendUrl}`,options)
    return response.statusText
};

async function unarchive(audit) {
    const ammendUrl = `/inspections/v1/inspections/${audit}/archive`
    const options = {
        method: 'DELETE',
        headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            authorization: `Bearer ${token}`
        }
    }
    const response = await fetch(`${url}${ammendUrl}`,options)
    return response.statusText
};

async function main(audit) {
    const archiveStep = await archive(audit)
    if(archiveStep !== "OK") {
        console.log(`failed to perform initial archive on ${audit}...`)
        await writer(audit,archiveStep,'Not executed, as archive failed')
    } else {
        console.log(`${audit} archived! Unarchiving...`)
        const unarchiveStep = await unarchive(audit)
        if(unarchiveStep !== "OK") {
            console.log(`failed to unarchive ${audit}!`)
            await writer(audit,archiveStep,'Archive succeeded. This record must be unarchived.')
        } else {
            console.log(`${audit} unarchived! Retrigger complete.`)
            await writer(audit,archiveStep,unarchiveStep)
        }
    }
};

for (const row of insProc) {
    await main(row.id)
};
