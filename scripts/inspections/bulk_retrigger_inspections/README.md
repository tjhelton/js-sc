# Bulk ReTrigger Inspections
The purpose of this script is to update the `modified_at` parameter of an inspection by simply updating the site data with the existing site data. This can "retrigger" webhooks in the event that customers missed data exporting due to a data workflow erre. This leverages SafetyCulture's open API.

## Set Up:
This script does not use any modules. The `records` variable at line 2 can be replaced with an array of inspections from any SQL output. Below is an example of a SQL query that returns an array of inspections from a Postgres output from the SafetyCulture Exporter Tool.
```sql
SELECT '[' || string_agg(quote_literal(audit_id), ', ') || ']'
FROM inspections;
```

## Running the Script:
Run the following command:
`node index.js <token>`

## Outputs:
None

## Notes for / from Ro:
I did the script this way because I didn't want to create CSVs for this. I wanted to simply export the customer's data, get the time range, and perform a SQL query with a `WHERE` to immediately get the records that I had to process.