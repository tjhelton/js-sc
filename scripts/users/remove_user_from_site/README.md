# Bulk Remove Users from Site Membership

The purpose of this script is to remove users from the site memberships of IDs provided.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a `input.csv` in the directory of this script, ensuring there is a `userId` column.

```csv
userId,siteId
user_f081bc4a552e4a47a33e039be144fa1c,location_3b11619cd73d45f6b667d36a62013391
f081bc4a-552e-4a47-a33e-039be144fa1c,location_23f2b45ece3544cc83921fa122a2cc67
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses.

## Additional Comments

The `output.csv` can be filtered for failures and retried if neeeded. This script accepts both `S12` and `UUID` formats in the input.