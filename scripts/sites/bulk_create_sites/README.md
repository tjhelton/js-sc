# Bulk Create Sites

The purpose of this script is to create sites in bulk.

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

Create an `input.csv` in the directory of this script. Include values separated into two columns: `siteName` and `parentId`. This script accounts for a parent location. If a site is not to be nested under another location, the `parentId` can be excluded.

```csv
siteName,parentId
<site_name>,<parent_id>
<site_name>,<left_blank, no parent_id>
<site_name>,<parent_id>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script will create an `output.csv` containing the sites created and their relevant statuses.

```csv
siteId,siteName,parentId,parentName,status
8c736943-89f2-4e71-be31-2f44a15ce23f,gloober8,d6157100-4f2e-4bcb-b923-dbda61a89b98,ballerina level up 1,OK
8c51f0ef-1cc5-4e56-a299-c736cd8159bb,choober8,d6157100-4f2e-4bcb-b923-dbda61a89b98,ballerina level up 1,OK
ba7e16c9-8b20-4dd0-b22b-29117c1a62e8,foofily8,no parent,no parent,OK
```

## Additional Comments

At the time of this writing, a few SafetyCulture endpoints that interact with sites will only accept a `parent_id` in its UUID format. The script accounts for this and accepts both UUID and S12 formats.
