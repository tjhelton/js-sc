# Bulk Delete Schedules

The purpose of this script is to bulk delete schedule items in a SafetyCulture environment.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create an `input.csv` in the directory of this script, ensuring there is a column entitled `id` containing schedule IDs.

```csv
id
<schedule_id>
<schedule_id>
<schedule_id>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv` with the ids and status of the deletions.

## Additional Comments

The output from this script can be filtered for errors and re-named `input.csv` for retries.
