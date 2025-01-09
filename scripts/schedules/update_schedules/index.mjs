import neatCsv from 'neat-csv'
import dotenv from 'dotenv'
import fs from 'fs/promises'
dotenv.config()

const url = 'https://api.safetyculture.io/schedules/v1/schedule_items/'
const token = process.env.TOKEN

const schedules = await fs.readFile('schedules.csv', 'utf8')
const schedCsv = await neatCsv(schedules)

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
      await fetch(`${url}${id}`, options)
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err));
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
