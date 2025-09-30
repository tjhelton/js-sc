# Get Activity Log Data
<!-- <script description> -->
This script allows for iterating through the activity log for an envrionment, and returning a CSV summary of the events requested.

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

This script will need to be set up depending on what data needs to be returned. Structure the CSV as needed by changing the `csvWriter` variable:

```js
const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'type', title: 'type' },
    { id: 'eventTime', title: 'eventTime' },
    { id: 'userId', title: 'userId' }
  ],
})
```

Note that any changes made to `csvWriter` will need to be changed in the declartion and call of the `writer` function:

```js
async function writer(type,time,user){
  const record = [
    {
      type: type,
      eventTime: time,
      userId: user
    }
  ]
  await csvWriter.writeRecords(record)
};
```

```js
await writer(item.type, item.event_at, item.user_id)
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

The script will output a CSV of the relevant activity log events.

## Additional Comments

Note that the activity log only returns data from the past 30 days. Any data needed beyond that time frame will not be able to be fetched via the SafetyCulture API.
