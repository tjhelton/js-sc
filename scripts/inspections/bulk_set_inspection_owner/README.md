# Bulk Set Owner

The purpose of this script is to set new inspection owners in bulk. Please note that the credentials provided during the API call to change the owner must match the owner of the original inspection in order to properly set the new owner - even for admins.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create an `input.csv` in the directory of the the script containing columns entitled `id` and `owner`, with the respective IDs of the inspections and the new owners.

```csv
id,owner
<audit_id>,<new_owner_id>
<audit_id>,<new_owner_id>
<audit_id>,<new_owner_id>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will create an `output.csv` containing the audit ID, new owner ID, and status of the API call to set the new owner.

## Additional Comments

The `output.csv` can be filtered for failures and renamed to `input.csv` for retries.
