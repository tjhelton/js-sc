# Create GRS CSV

The purpose of this script is to create a CSV of response IDs and their labels from a given response set.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with `TOKEN` and `GRS` parameters as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...

GRS='responseset_024d2d482b7c41d2ba4c343b444981a9'
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will generate a `output.csv` array that can be used in randomization.

## Additional Comments
