# Create CSV Global Response Set
The purpose of this script is to generate a CSV of a global response set (GRS) with labels and IDs. This is often helpful when creating lookups for other integrations or otherwise bulk editing GRS. This script uses SafetyCulture's open API.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token> <grs_id>`

## Outputs:
Once the script is complete, a CSV file entitled `responses.csv` will be created.
