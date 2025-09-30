# Bulk Update Site Names

The purpose of this script is to rename sites in bulk.

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

Create an `input.csv` in the directory of this script. Include values separated into two columns: `siteId` and `newName`.

```csv
siteId,newName
<site_id>,<new_name>
<site_id>,<new_name>
<site_id>,<new_name>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script will create an `output.csv` containing the sites created and their relevant statuses.

```csv
siteId,siteOldName,siteNewName,status
location_cefa533fae514f74af1890a891018944,old site name,new site name,OK
location_3b11619cd73d45f6b667d36a62013391,site 123,site 456,OK
```

## Additional Comments

At the time of this writing, a few SafetyCulture endpoints that interact with sites will only accept a `parent_id` in its UUID format. The script accounts for this and accepts both UUID and S12 formats.
