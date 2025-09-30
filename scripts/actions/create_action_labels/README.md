# Bulk Create Action Labels

The purpose of this script is to create action labels in bulk.

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

Create a CSV titled `input.csv` and save it in the directory of the script. Ensure the CSV has a column entitled `labelName`:

```csv
labelName
<data>
<data>
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will create a `output.csv` including a `status` column.

## Additional Comments

In the event that a creating an action label fails, the `output.csv` is structured so that it can be renamed to `input.csv` and the script can be re-ran for failures.
