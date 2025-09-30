# Bulk Update User Seat with User ID

The purpose of this script is to bulk update user `seat`s with a user ID provided.

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

Create an `input.csv` in the directory of this script containing an `userId` and a `seatType` column.
```csv
userId,seatType
<user_id>,full
<user_id>,free
```

Note that the accepted values for seat types are: `full`, `lite`, or `free`. Note that users have to be `active` for the users to update.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv`.

## Additional Comments
