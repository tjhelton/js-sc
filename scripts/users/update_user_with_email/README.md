# Bulk Update User with Email

The purpose of this script is to bulk update users with an email address provided, as often that is how customers or Customer Success Managers provide this data to SafetyCulture.

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

Create an `input.csv` in the directory of this script containing columns for the relevant parameters that you are wanting to update for those users. It is recommended to leave `email` as a default argument everywhere in this script, as that is used during the search user process.

Below is an example of what this input might look like to update seat types.

```csv
email,seatType
user@gmail.com,full
user2@qtvm.onmicrosoft.com,free
```

Note that the accepted values for seat types are: `full`, `lite`, or `free`. Additionally, users have to be `active` for the users to update.

There are several parts of this script that will need to be updated based on what the objective is for updating users. Please refer to the comments in the script to understand how to change logs, payloads, and funcitons so that the script performs as needed. 

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv`.

## Additional Comments
