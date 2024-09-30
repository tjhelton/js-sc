# Bulk Set Action Site
The purpose of this script is to set sites for actions.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing the action IDs and respective site IDs in the same directory that this script is in entitled `actions.csv`. The CSV should have the following header and data structure:
```csv
action_id,site_id
<action_id>,<site_id>
<action_id>,<site_id>
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
The script will log when a actions is modified in the console.

## Notes for / from Ro:
