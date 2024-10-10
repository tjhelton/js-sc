# Bulk Complete Inspections
The purpose of this script is to permenantly complete inspections in bulk.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing the audit IDs in the same directory that this script is in entitled `inspections.csv`. The CSV should have the following header and data structure:
```csv
inspections,date
<audit_id>,ISO complete date
<audit_id>,2024-10-10T13:46:33.325Z
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `completed.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
