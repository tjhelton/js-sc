# Bulk Archive and Delete Assets

The purpose of this script is to archive and delete assets in bulk.

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

Create a CSV entitled `input.csv` that includes a column entitled `asset_id`:

```csv
asset_id
<asset_id>
<asset_id>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv` with a `status` column.

## Additional Comments

In the event that failures have to be retried, the `output.csv` can be filtered for failures and renamed to `input.csv` to run the script again.

Currently, the 'error handling' for the `archiveAsset` function in this script is redundant, as calling the API to archive an already archived asset does not throw an error.
