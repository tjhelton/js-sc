# Bulk Set Inspection Site

The purpose of this script is to set inspection site's to a new site in bulk.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a `input.csv` in the directory of this script with columns entitled `id` and `site`, containing the audit IDs and site IDs respectively.

```csv
id,site
<auditId>,<siteId>
<auditId>,<siteId>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script creates a `output.csv` containing the relevant IDs and statuses of the API calls that changed the assigned sites.

## Additional Comments

The `output.csv` from this script can be filtered for errors and renamed to `input.csv` for retries.
