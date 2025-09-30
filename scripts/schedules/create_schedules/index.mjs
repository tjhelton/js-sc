import neatCsv from 'neat-csv'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'
const url = 'https://api.safetyculture.io/schedules/v1/schedule_items'

const schedules = await fs.readFile('input.csv', 'utf8')
const schedCsv = await neatCsv(schedules)

const outputCsvPath = 'output.csv'

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

async function createSched(payload) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  };
      const response = await fetch(url, options)
      const json = await response.json()
      if(!response.ok) {
        console.log(`error creating ${json.id}: ${response.status}: ${response.statusText}`)
        await writer(json.id,json.message)
      } else {
        console.log(`${json.id} has been created!`)
        await writer(json.id,response.statusText)
      }
};

async function main(sub, template, desc, rec, fdate, atype, assignee, site) {
      const payload = {
        "must_complete": "ONE",
        "can_late_submit": Boolean(sub),
        "start_time": {
          "hour": 9,
          "minute": 0
        },
        "document": {
          "type": "TEMPLATE",
          "id": template
        },
        "creator": {
          "type": "USER",
          "id": process.env.USERID
        },
        "description": desc,
        "recurrence": rec,
        "duration": "", //add manually or create an argument.
        "from_date": new Date(fdate).toISOString(),
        "assignees": [
          {
            "type": atype.toUpperCase(),
            "id": assignee
          }
        ],
        "location_id" : site
      }
    await createSched(payload)
};

for (const row of schedCsv) {
  await main(row.can_late_submit, row.template_id, row.description, row.recurrence, row.from_date, row.type, row.assignee_id, row.site_id)
};