# Create GRS Array

The purpose of this script is to create an array of response IDs from a SafetyCulture GRS. This script is part of a randomization effort for demos.

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

Alternatively, you can hardcode your API token directly in the `index.mjs` file by replacing `'YOUR_API_TOKEN_HERE'` in the token variable.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will generate a `grs.json` array that can be used in randomization.

Example:

```json
[
  "ab0d1527-64c7-4e86-87c2-24263c834390",
  "c300fea2-1d09-487d-9f54-1fa34b9f587f",
  "acfc78d0-51e0-42f4-850b-53372f260ddd",
  "bdabef05-4588-40dd-9d29-028908312f69",
  "db04b243-53d8-4945-9d6a-9a2e70573c13"
]
```

## Additional Comments
