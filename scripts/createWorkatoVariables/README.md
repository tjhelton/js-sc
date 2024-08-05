# Create Workato Variables
The purpose of this script is to take a list of labels and convert them into a JSON schema that can be pasted directly into Workato when creating variable lists.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```
Upload a CSV containing just labels of variables in the same directory that this script is in entitled `keys.csv`. The CSV should have the following header and data structure:
```csv
keys
<variable_name>,
<variable_name>,
etc.
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:
Once the script is complete, a log file entitled `jsonSchema.json` will be created. Paste this into the variables list in Workato to create your list of variables!

## Notes for / from Ro:
Currently, Ro pretty much always uses the 'string' type when creating these lists, as Workato formula mode usually allows for any run time transformations.