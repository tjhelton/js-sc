# Bulk Update Schedules

The purpose of this script is to update schedule items in bulk. Special care should be taken when editing the payload for these API calls, as the Start Date, Duration, Starting Day, and more can impact how these schedules update.

## Set up

Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:
```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Use the SafetyCulture Exporter to write schedule data to a database. At the time of this scripts writing, SafetyCulture Exporter CLI `v4.18.4` was used to export to a local Postgres SQL database. Please see the `safetyculture-exporter.yaml` in this repo for the exact export settings needed.

Once the data is in the database, export the following query results to csv and name the document `schedules.csv`:
```sql
select
s.duration,
s.schedule_id,
s.can_late_submit,
s.template_id,
s.description,
s.recurrence,
s.from_date,
sa.type,
sa.assignee_id,
s.site_id
from schedules s
join schedule_assignees sa on sa.schedule_id = s.schedule_id
where s.status = 'ACTIVE'
```

The csv should have the following header structure:
```csv
schedule_id,can_late_submit,template_id,description,recurrence,from_date,type,assignee_id,site_id
data,data,data...
```

Prior to running the script, edit the payload as needed for the use case in `index.mjs` starting at line 29. Bear in mind that changes to any dynamic arguments changed static will have to be accounted for in the arguments passed into the main function.
```js
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
```


## Running the script

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs

None.

## Additional Comments
