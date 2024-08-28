# Update User Status/Seat with Emails
The purpose of this script is to update user emails in bulk using just their emails. This script uses SafetyCulture's open API. The script was designed to be faster about actioning this kind of automation for CSMs / AEs, as often they are just providing us with customer email addresses. For an added layer of control, CSEs can use the `update_user_emails_with_id` script and create the necessary cross reference.

As this script usees the customer-facing API, bear in mind that these email addresses will NOT change until the user confirms the new email address from their inbox.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing user emails, seat types, and statuses in the same directory that this script is in entitled `userUpdate.csv`. The CSV should have the following header and data structure:
```csv
email,new_email
<user_email>,<new_email>
<user_email>,<new_email>
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a log file entitled `user_updates.log` will be created. Attach the log to the request (Salesforce or Jira) for traceability.

## Notes for / from Ro:
Bear in mind that user emails that are linked to multiple orgs or maintained by multiple orgs can throw Bad Request or Forbidden errors. If you see those errors happening, I recommend spot checking a few and making note in the ticket.

Future Update: Write errors to a separate transport for CS...