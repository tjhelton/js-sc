# Bulk Create Groups

The purpose of this script is to create groups in bulk.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a CSV in the directory of this script called `input.csv` with a column entitled `groupName`:

```csv
groupName
name
name
name
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script creates an `output.csv` with a `status` column and the `id` of the group created.

## Additional Comments

In the event of failures, the `output.csv` file can be filtered for errors and renamed to `input.csv` to be passed again.
