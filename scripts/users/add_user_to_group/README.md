# Bulk Add Users to Groups

The purpose of this script is to bulk add users to groups with their user IDs and the group IDs.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Create a `input.csv` in the directory of this script, ensuring there is a `userId` and `groupId` column.

```csv
userId,groupId
data,data,...
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This file will generate an `output.csv` containing the respective statuses. At the time of this writing, trying to add a user to a group that the user is already in will throw an error.

## Additional Comments

This script can be improved by returning the `data.message` from the initial API call. The `output.csv` can be filtered for failures and retried if neeeded.
