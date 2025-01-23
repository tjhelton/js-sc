# Bulk Update User Seat with Email

The purpose of this script is to bulk update user `seat`s with an email address provided, as often that is how customers provide this data to SafetyCulture.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create an `input.csv` in the directory of this script containing an `email` and a `seatType` column.
```csv
email,seatType
user@gmail.com,full
user2@qtvm.onmicrosoft.com,free
```

Note that the accepted values for seat types are: `full`, `lite`, or `free`. Note that users have to be `active` for the users to update.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv`.

## Additional Comments
