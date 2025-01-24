# Bulk Activate Users

The purpose of this script is to bulk activate users using their user IDs.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a `input.csv` in the directory of this script, ensuring there is a `userId` and a `seatType`column. `seatType` must be set to `free`, `full`, or `lite`.

```csv
userId,seatType
data,full
data,lite
data,free
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses.

## Additional Comments

The `output.csv` can be filtered for failures and renamed to `input.csv` for retries as needed.
