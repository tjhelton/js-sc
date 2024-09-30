import fs from 'fs';
import csv from 'csv-parser';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

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
        const labelName = row.labelName;
        const labelId = crypto.randomUUID();

        const options = {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${bToken}`,
          },
          body: JSON.stringify({label: {label_id: labelId, label_name: labelName}}),
        };

        try {
          const response = await fetch('https://api.safetyculture.io/tasks/v1/customer_configuration/action_labels/upsert', options);

          // Log the full response for debugging
          const responseText = await response.text();
          
          if (response.ok) {
            row.status = 'SUCCESS';
            console.log(`SUCCESS For: ${labelName}`);
        
          } else {
            row.status = 'ERROR';
            console.error(`Error for label ${labelName}: ${responseText}`);
          }
        } catch (err) {
          row.status = 'ERROR';
          console.error(`Network error for label ${labelName}:`, err);
        }
      }

      // Write the results to a new CSV file
      const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: [
          { id: 'labelName', title: 'labelId' },
          { id: 'labelName', title: 'labelId' },
          { id: 'status', title: 'Status'}
        ],
      });

      await csvWriter.writeRecords(results);
      console.log('CSV file has been processed and saved as output.csv');
    });
};

processCsv();
