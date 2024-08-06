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
        const siteId = row.siteId;
        const newName = row.newName;


        const options = {
          method: 'PATCH',
          headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${bToken}`,
          },
          body: JSON.stringify({name: {val: newName}}),
        };

        try {
          const response = await fetch(`https://api.safetyculture.io/directory/v1/folder/${siteId}`, options);
          const data = await response.json();

          if (response.ok) {
            row.status = 'SUCCESS';
            console.log(`${siteId} - ${newName} - SUCCESS`);
          } else {
            row.status = 'ERROR';
            console.error(`Error for auditId ${siteId}: ${data.message}`);
          }
        } catch (err) {
          row.status = 'ERROR';
          console.error(`Network error for auditId ${siteId}:`, err);
        }
      }

      // Write the results to a new CSV file
      const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: [
          { id: 'siteId', title: 'siteId' },
          { id: 'newName', title: 'newName' },
          { id: 'status', title: 'status' },
        ],
      });

      await csvWriter.writeRecords(results);
      console.log('CSV file has been processed and saved as output.csv');
    });
};

processCsv();
