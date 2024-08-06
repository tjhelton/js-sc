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
        const description = row.description;
        const mustComplete = row.mustComplete;
        const canLateSubmit = row.canLateSubmit;
        const recurrence = row.recurrence;
        const startTimeHour = row.startTimeHour;
        const startTimeMinute = row.startTimeMinute;
        const duration = row.duration;
        const timezone = row.timezone;
        const fromDate = row.fromDate;
        const assigneeId = row.assigneeId;
        const assigneeType = row.assigneeType;
        const documentId = row.documentId;
        const documentType = row.documentType;
        const assetId = row.assetId;
        const locationId = row.locationId;

        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: `Bearer ${bToken}`,
          },
          body: JSON.stringify({
            must_complete: 'ONE',
            can_late_submit: true,
            start_time: {hour: startTimeHour, minute: startTimeMinute},
            document: {type: 'TEMPLATE', id: documentId},
            status: 'STATUS_UNSPECIFIED',
            creator: {type: 'ENTITY_TYPE_UNSPECIFIED'},
            assignees: [{type: 'ROLE', id: assigneeId}],
            timezone: timezone,
            duration: duration,
            from_date: fromDate,
            recurrence: recurrence,
            description: description,
            asset_id: assetId,
            location_id: locationId
          })
        };

        try {
          const response = await fetch('https://api.safetyculture.io/schedules/v1/schedule_items', options);
          const data = await response.json();

          if (response.ok) {
            row.status = 'SUCCESS';
            console.log(`${description} SUCCESS`)
          } else {
            row.status = 'ERROR';
            console.error(`Error for schedule ${description}: ${data.message}`);
          }
        } catch (err) {
          row.status = 'ERROR';
          console.error(`Network error for schedule ${description}:`, err);
        }
      }

      // Write the results to a new CSV file
      const csvWriter = createCsvWriter({
        path: outputCsvPath,
        header: [
            { id: 'description', title: 'description' },
            { id: 'mustComplete', title: 'mustComplete' },
            { id: 'canLateSubmit', title: 'canLateSubmit' },
            { id: 'recurrence', title: 'recurrence' },
            { id: 'startTimeHour', title: 'startTimeHour' },
            { id: 'startTimeMinute', title: 'startTimeMinute' },
            { id: 'duration', title: 'duration' },
            { id: 'timezone', title: 'timezone' },
            { id: 'fromDate', title: 'fromDate' },
            { id: 'assigneeId', title: 'assigneeId' },
            { id: 'assigneeType', title: 'assigneeType' },
            { id: 'documentId', title: 'documentId' },
            { id: 'documentType', title: 'documentType' },
            { id: 'locationId', title: 'locationId' },
            { id: 'assetId', title: 'assetId' },
            { id: 'status', title: 'status' }
          ],
      });

      await csvWriter.writeRecords(results);
      console.log('CSV file has been processed and saved as output.csv');
    });
};

processCsv();
