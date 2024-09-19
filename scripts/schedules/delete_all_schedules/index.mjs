import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

const bToken = 'TOKEN_HERE';
const baseUrl = 'https://api.safetyculture.io';
const outputCsvPath = 'output.csv';

// Function to fetch all schedule IDs via pagination
async function fetchAllScheduleIds(url, options) {
  let scheduleIds = [];
  let nextPage = url;

  try {
    while (nextPage) {
      const response = await fetch(nextPage, options);
      const result = await response.json();

      // Extract schedule IDs from the current page
      const ids = result.data.map(schedule => schedule.id);
      scheduleIds = scheduleIds.concat(ids);

      // Handle the next page URL
      if (result.metadata.next_page) {
        nextPage = `${baseUrl}${result.metadata.next_page}`; // Ensure full URL
      } else {
        nextPage = null;
      }
    }

    return scheduleIds;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// Function to delete schedules based on fetched schedule IDs
const deleteSchedules = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      authorization: `Bearer ${bToken}`,
    },
  };

  // Fetch all schedule IDs
  const scheduleIds = await fetchAllScheduleIds(
    `${baseUrl}/feed/schedules?show_active=true`,
    options
  );

  const results = [];

  // Process each schedule ID for deletion
  for (const scheduleId of scheduleIds) {
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'sc-integration-id': 'sc-readme',
        'content-type': 'application/json',
        authorization: `Bearer ${bToken}`,
      },
    };

    try {
      const response = await fetch(`${baseUrl}/schedules/v1/schedule_items/${scheduleId}`, deleteOptions);

      // Log the full response for debugging
      const responseText = await response.text();

      if (response.ok) {
        results.push({ scheduleId, status: 'SUCCESS' });
        console.log(`SUCCESS for: ${scheduleId}`);
      } else {
        results.push({ scheduleId, status: 'ERROR' });
        console.error(`Error for ${scheduleId}: ${responseText}`);
      }
    } catch (err) {
      results.push({ scheduleId, status: 'ERROR' });
      console.error(`Network error for ${scheduleId}:`, err);
    }
  }

  // Write the results to a new CSV file
  const csvWriter = createCsvWriter({
    path: outputCsvPath,
    header: [
      { id: 'scheduleId', title: 'scheduleId' },
      { id: 'status', title: 'status' },
    ],
  });

  await csvWriter.writeRecords(results);
  console.log('CSV file has been processed and saved as output.csv');
};

// Run the script
deleteSchedules();
