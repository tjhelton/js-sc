# Update User Emails
The purpose of this script is to update user emails with their SafetyCulture user IDs. As this script uses SafetyCulture's open API, these users will recieve email notifications to accept the updated email.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing user IDs and new emails in the same directory that this script is in entitled `users.csv`. The CSV should have the following header and data structure:
```csv
userId,email
<sc_user_id>,<new_email>
<sc_user_id>,<new_email>
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.js <token>`

## Outputs:
none

## Notes for / from Ro:
Need to add logging...