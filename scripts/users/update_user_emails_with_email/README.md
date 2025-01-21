# Bulk Update User Emails with Emails

The purpose of this script is to update user emails by looking them up with their old emails, as sometimes customers provide this information to us in this format.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a `input.csv` in the directory of this script, ensuring there are `oldEmail` and `newEmail` columns.

```csv
oldEmail,newEmail
roby+apple@safetyculture.io,roby+pineapple@safetyculture.io
roby+banana@safetyculture.io,roby+watermelon@wsafetyculture.io
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses.

## Additional Comments

The `output.csv` can be filtered for failures and retried if neeeded.