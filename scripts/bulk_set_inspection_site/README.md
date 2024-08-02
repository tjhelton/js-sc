# Bulk Set Inspection Site
The purpose of this script is to update the site on a series of inspections. This script uses SafetyCulture's open API.

Customers commonly need to change the site data of inspections to fix reporting or mapping in a reporting solution.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing audit IDs and site IDs in the same directory that this script is in entitled `setSite.csv`. The CSV should have the following header and data structure:
```csv
inspection,site
<audit_id>,<site_id>
<audit_id>,<site_id>
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `siteAssignments.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
