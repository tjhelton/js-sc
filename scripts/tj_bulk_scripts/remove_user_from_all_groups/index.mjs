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
        const userId = row.userId;

        // Fetch groups associated with the user
        try {
          const groupResponse = await fetch(`https://api.safetyculture.io/accounts/organisation/v1/accounts/user/${userId}/groups`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
              authorization: `Bearer ${bToken}`,
              'sc-integration-id': 'sc-readme',
            },
          });

          const groupData = await groupResponse.json();

          if (groupResponse.ok && groupData.groups) {
            // Deactivate the user from each group
            for (const group of groupData.groups) {
              try {
                const deactivateResponse = await fetch(`https://api.safetyculture.io/groups/${group.id}/users/${userId}`, {
                  method: 'DELETE',
                  headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${bToken}`,
                    'sc-integration-id': 'sc-readme',
                  },
                });

                const deactivateResponseText = await deactivateResponse.text();
                console.log(`Deactivation response for user ${userId} from group ${group.id}:`, deactivateResponseText);

                if (!deactivateResponse.ok) {
                  console.error(`Error deactivating user ${userId} from group ${group.id}: ${deactivateResponseText}`);
                  row.status = 'ERROR';
                  break;
                }
              } catch (err) {
                console.error(`Network error deactivating user ${userId} from group ${group.id}:`, err);
                row.status = 'ERROR';
                break;
              }
            }

            if (row.status !== 'ERROR') {
              row.status = 'SUCCESS';
            }
          } else {
            console.error(`Error fetching groups for user ${userId}:`, groupData);
            row.status = 'ERROR';
          }
        } catch (err) {
          console.error(`Network error fetching groups for user ${userId}:`, err);
          row.status = 'ERROR';
        }
      }

      // Write the results to a new CSV file
      const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: [
          { id: 'userId', title: 'userId' },
          { id: 'status', title: 'status' },
        ],
      });

      await csvWriter.writeRecords(results);
      console.log('CSV file has been processed and saved as output.csv');
    });
};

processCsv();
