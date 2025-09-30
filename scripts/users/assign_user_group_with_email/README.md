# Bulk Add Users to Groups with Email

The purpose of this script is to bulk add users to groups with their emails and the group IDs, as often customers provide us the data this way.

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

Create a `input.csv` in the directory of this script, ensuring there is a `email` and `groupId` column.

```csv
email,groupId
test@boof.net,role_1234,...
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses. At the time of this writing, trying to add a user to a group that the user is already in will throw an error.

## Additional Comments

The `output.csv` can be filtered for failures and retried if neeeded.