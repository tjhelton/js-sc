# Bulk Delete Sites

The purpose of this script is to delete sites in bulk.

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

Create an `input.csv` in the directory of this script. Include the header `siteId`.

```csv
siteId
<site_id>
<site_id>
<site_id>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script will create an `output.csv` containing the sites created and their relevant statuses.

```csv
siteId,status
<site_id>,OK
<site_id>,error message
```

## Additional Comments

At the time of this writing, a few SafetyCulture endpoints that interact with sites will only accept a `siteId` in its UUID format. The script accounts for this and accepts both UUID and S12 formats.
