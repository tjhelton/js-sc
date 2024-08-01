# Update User Status/Seat with Emails
The purpose of this script is to assign users to groups in bulk using just their emails. This script uses SafetyCulture's open API. The script was designed to be faster about actioning this kind of automation for CSMs / AEs, as often they are just providing us with customer email addresses.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing user emails, seat types, and statuses in the same directory that this script is in entitled `userUpdate.csv`. The CSV should have the following header and data structure:
```csv
user_email,group_id
<email>,<group_id>
<email>,<group_id>
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `user_updates.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
Error handling needs to be made more clear.