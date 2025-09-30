# Bulk ReTrigger Inspections

The purpose of this script is to update the `modified_at` parameter of an inspection by simply archiving an inspection and unarchiving an inspection. This can "re-trigger" webhooks in the event that customers missed data exporting due to a data workflow error. This leverages SafetyCulture's open API.

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

Create a `input.csv` in the directory of the script before executing. The file must have a column entitled `id` with audit IDs to be re-triggered.

```csv
id
<audit_id>
<audit_id>
```

An easy way to get specific data targeted for this CSV is by leveraging the SafetyCulture exporter to export records to an external database. Once complete, the following query can return IDs needed:

```sql
SELECT id
FROM inspections
-- relevant date_completed to target relevant records
WHERE date_completed > '2024-06-01'
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will generate a `output.csv` in the directory of the script with relevant archive / unarchive statuses.

## Additional Comments

The `output.csv` can be filtered for errors and renamed to `input.csv` for retries as needed.
