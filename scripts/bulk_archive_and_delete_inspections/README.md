# Bulk Archive and Delete Inspections
The purpose of this script is to permenantly delete inspections in bulk. In the event that we drive an automation for a customer during testing and erroneously create a large list of records, this script comes in handy to clean up the account. 

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing the audit IDs in the same directory that this script is in entitled `inspections.csv`. The CSV should have the following header and data structure:
```csv
inspections
<audit_id>,
<audit_id>,
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `inspections.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
