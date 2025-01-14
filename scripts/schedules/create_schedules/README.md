# Bulk Create Schedules

The purpose of this script is to create schedule items in bulk. Special care should be taken when editing the payload for these API calls, as the Start Date, Duration, Starting Day, and more can impact how these schedules are created.

## Set up

Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```

Create a .env file with `TOKEN` and `USERID` parameters as follows:
```bash
TOKEN=35db5156cea46ed...

USERID=user_...
```

Use the SafetyCulture Exporter to write schedule data to a database. At the time of this scripts writing, SafetyCulture Exporter CLI `v4.19.2` was used to export to a local Postgres SQL database. Please see the `safetyculture-exporter.yaml` in this repo for the exact export settings needed.

Once the data is in the database, export the following query results to csv and name the document `input.csv`:

```sql
select
s.duration,
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
-- the below where statement is an example of how to filter down query results to a subset of records needing to be created
-- where s.status = 'FINISHED' and description LIKE '%963640%'
```

The csv should have the following header structure:

```csv
duration,can_late_submit,template_id,description,recurrence,from_date,type,assignee_id,site_id
data,data,data...
```

Prior to running the script, edit the payload as needed for the use case in `index.mjs` in the `main()` function. Bear in mind that changes to any dynamic arguments changed static will have to be accounted for in the arguments passed into the main function.

Note that `duration` is blank in this script and must be either hard-coded or an argument should be added to the payload and function!

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

## Outputs:

This script generates an `output.csv` with the ids and status of the deletions.

## Additional Comments
