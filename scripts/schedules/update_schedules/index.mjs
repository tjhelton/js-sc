import neatCsv from 'neat-csv'
import dotenv from 'dotenv'
import fs from 'fs/promises'
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
dotenv.config()

const url = 'https://api.safetyculture.io/schedules/v1/schedule_items/'
const token = process.env.TOKEN

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

async function updateSched(id, payload) { //copied from sc docs, to be improved later
      const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      };
      const response = await fetch(`${url}${id}`, options)
      if(!response.ok) {
        console.log(`error updating ${id}...`)
      } else {
        console.log(`updated ${id}...`)
      }
      await writer(id,response.statusText)
};

async function main(id, sub, template, desc, rec, fdate, atype, assignee, site) {
    const payload = {
        "must_complete": "ONE",
        "can_late_submit": Boolean(sub),
        "start_time": {
          "hour": "9",
          "minute": "0"
        },
        "document": {
          "type": "TEMPLATE",
          "id": template
        },
        "status": "ACTIVE",
        "description": desc,
        "recurrence": rec,
        "duration": "P1DT8H",
        "from_date": new Date(fdate).toISOString(),
        "assignees": [
          {
            "type": atype.toUpperCase(),
            "id": assignee
          }
        ],
        "location_id": site
      }
    await updateSched(id, payload)
};

for (const row of schedCsv) {
  await main(row.schedule_id, row.can_late_submit, row.template_id, row.description, row.recurrence, row.from_date, row.type, row.assignee_id, row.site_id)
}
