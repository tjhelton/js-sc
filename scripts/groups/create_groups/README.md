# Bulk Create Groups
The purpose of this script is to create groups in bulk with a csv of names.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing the group names in the same directory that this script is in entitled `groupNames.csv`. The CSV should have the following header and data structure:
```csv
names
<group_name>,
<group_name>,
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
The script will log when a group is created.

## Notes for / from Ro:
