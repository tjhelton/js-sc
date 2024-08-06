import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import fetch from 'node-fetch';

const bToken = 'TOKEN_HERE';

const inputCsvPath = 'input.csv';
const outputCsvPath = 'output.csv';

const processCsv = async () => {
  const results = [];

  // Read the CSV file
  fs.createReadStream(inputCsvPath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', async () => {
      // Process each row
      for (const row of results) {
        const assetId = row.assetId;
        const siteId = row.siteId;

        const options = {
          method: 'PATCH',
          headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${bToken}`,
          },
          body: JSON.stringify({
            type: {type: 'TYPE_CATEGORY_UNSPECIFIED'},
            site: {id: siteId},
            state: 'ASSET_STATE_UNSPECIFIED'
          })
        };

        try {
          const response = await fetch(`https://api.safetyculture.io/assets/v1/assets/${assetId}`, options);

          // Log the full response for debugging
          const responseText = await response.text();
          console.log(`Response for asset ${assetId}:`, responseText);

          if (response.ok) {
            const data = responseText ? JSON.parse(responseText) : {}; // Parse only if responseText is not empty
            row.status = 'SUCCESS';
          } else {
            row.status = 'ERROR';
            console.error(`Error for asset ${assetId}: ${responseText}`);
          }
        } catch (err) {
          row.status = 'ERROR';
          console.error(`Network error for asset ${assetId}:`, err);
        }
      }

      // Write the results to a new CSV file
      const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: [
          { id: 'assetId', title: 'assetId' },
          { id: 'siteId', title: 'siteId' },
          { id: 'status', title: 'status' },
        ],
      });

      await csvWriter.writeRecords(results);
      console.log('CSV file has been processed and saved as output.csv');
    });
};

processCsv();
