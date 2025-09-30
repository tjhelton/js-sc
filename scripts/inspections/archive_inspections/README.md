# Bulk Archive Inspections

The purpose of this script is to bulk archive inspections from a CSV.

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

Create a `input.csv` in the directory of the script. There must be a column entitled `id`

```csv
id
<data>
<data>
<data>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script will create an `output.csv` with the `status` of the call to archive.

## Additional Comments

The `output.csv` from this script can be filtered for failures and renamed to `input.csv` to run the script again. Previously, the archive inspections endpoint with SafetyCulture would throw an error in the event that an archived inspection was passed to this API. Now, a `200` status will return even if the API call didn't actually archive the inspection, as it was already archived.
