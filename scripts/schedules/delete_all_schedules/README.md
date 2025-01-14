# Bulk Delete All Schedules

The purpose of this script is to bulk delete ALL schedule items in a SafetyCulture environment.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

Consider the `ammendUrl` in this script:

```js
let ammendUrl = `/feed/schedules?show_active=true&show_finished=true&show_paused=true`
```

The parameters in this URL should be changed depending on what is being targeted for deletion.

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

This script generates an `output.csv` with the ids and status of the deletions.

## Additional Comments

This script does not require any input, as it uses the schedules data feed to get all schedules in an environment.
