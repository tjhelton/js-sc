# Delete All Action Labels

The purpose of this script is to delete all action labels in a SafetyCulture environment.

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

This script requires no further setup.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

As this script performs one API call for multiple labels, a single `output.csv` is produced to show all of the action labels fetched before the deletion.

## Additional Comments

The output could be renamed to `input.csv` and used with the `create_action_labels` script if needed.
