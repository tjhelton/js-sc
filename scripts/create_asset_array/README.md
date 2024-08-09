# Create Array Sites
The purpose of this script is to generate an arry of site IDs. This is often helpful when creating bulk randomized inspections, as this array can be input into a script to pre-fill with a random value. This script uses SafetyCulture's open API.

## Set up:
Ensure dependencies are installed by running the below command in the directory of the script:
```bash
npm i
```

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token>`

## Outputs:
Once the script is complete, a json file entitled `sites.json` will be created.
