# script name

The purpose of this script is to set the `site_id` associated with an `action_id` in bulk.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will create an `output.csv` including a `status` column.

## Additional Comments

In the event of failures, the `output.csv` file can be filtered for errors and renamed to `input.csv` to be passed again.

At the time of this writing, the SafetyCulture endpoint for updating the site on an action will only accept a `site_id` in its UUID format. The script accounts for this and accepts both UUID and S12 formats.
