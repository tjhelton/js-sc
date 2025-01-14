# Bulk Archive and Delete Inspections

The purpose of this script is to bulk archive and delete inspections from a CSV.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

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

This script will create an `output.csv` with the respective status of `archive` and `delete`.

## Additional Comments

The `output.csv` from this script can be filtered for failures and renamed to `input.csv` to run the script again.

Previously, the archive inspections endpoint with SafetyCulture would throw an error in the event that an archived inspection was passed to this API. Now, a `200` status will return even if the API call didn't actually archive the inspection, as it was already archived.

Please note that an inspection must be archived prior to being deleted. If a record fails to archive, it will fail to delete.
