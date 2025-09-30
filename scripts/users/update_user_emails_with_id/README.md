# Bulk Update User Emails with IDs

The purpose of this script is to update user emails with their user IDs.

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

Create a `input.csv` in the directory of this script, ensuring there are `userId` and `newEmail` columns.

```csv
userId,newEmail
user_1863630c37ec4dc6862eb3612afd8441,roby+fruit@safetyculture.io
12a1f4d3-525a-4134-ae46-188a564384e7,roby+borberBerba@safetyculture.io
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses.

## Additional Comments

The `output.csv` can be filtered for failures and retried if neeeded.