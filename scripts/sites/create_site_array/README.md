# Create Array Sites

The purpose of this script is to generate an array of site IDs. This is often helpful when creating bulk randomized inspections, as this array can be input into a script to pre-fill with a random value. This script uses SafetyCulture's open API.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Alternatively, you can hardcode your API token directly in the `index.mjs` file by replacing `'YOUR_API_TOKEN_HERE'` in the token variable.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

Once the script is complete, a json file entitled `sites.json` will be created.

## Additional Comments

This script outputs site IDs in their UUID format, as that is likely the format that will be needed for any other endpoint during randomization.
