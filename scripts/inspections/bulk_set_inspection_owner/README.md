# Bulk Set Inspection Owner
The purpose of this script is to change the owner(s) of several inspections. This leverages SafetyCulture's open API.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing audit IDs and user IDs of the new owner in the same directory that this script is in entitled `inspections.csv`. The CSV should have the following header and data structure:
```csv
inspection,user
<audit_id>,<user_id>
<audit_id>,<user_id>,
etc.
```

## Running the Script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `inspectionOwners.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
