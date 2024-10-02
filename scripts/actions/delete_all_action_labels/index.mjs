import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

const bToken = 'TOKEN_HERE';
const baseUrl = 'https://api.safetyculture.io';
const outputCsvPath = 'output.csv';

// Function to fetch all action label IDs and names
async function fetchAllActionLabels(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Extract label IDs and names from the response
    const labels = result.labels.map(label => ({
      labelId: label.label_id,
      labelName: label.label_name,
    }));

    return labels;
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}

// Function to delete action labels based on fetched label IDs
const deleteActionLabels = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      authorization: `Bearer ${bToken}`,
    },
  };

  // Fetch all action label IDs and names
  const labels = await fetchAllActionLabels(
    `${baseUrl}/tasks/v1/customer_configuration/action_labels`,
    options
  );

  const labelIds = labels.map(label => label.labelId);
  const results = [];

  // Prepare delete request options
  const deleteOptions = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      'content-type': 'application/json',
      authorization: `Bearer ${bToken}`,
    },
    body: JSON.stringify({ label_ids: labelIds }),
  };

  try {
    const response = await fetch(`${baseUrl}/tasks/v1/customer_configuration/action_labels/delete`, deleteOptions);
    
    // Log the full response for debugging
    const responseText = await response.text();

    if (response.ok) {
      results.push({ status: 'SUCCESS' });
      console.log(`All action labels deleted successfully.`);
    } else {
      results.push({ status: 'ERROR' });
      console.error(`Error deleting action labels: ${responseText}`);
    }
  } catch (err) {
    results.push({ status: 'ERROR' });
    console.error('Network error during action label deletion:', err);
  }

  // Write the results to a new CSV file
  const csvWriter = createCsvWriter({
    path: outputCsvPath,
    header: [
      { id: 'labelId', title: 'labelId' },
      { id: 'labelName', title: 'labelName' },
      { id: 'status', title: 'status' },
    ],
  });

  const csvData = labels.map(label => ({
    labelId: label.labelId,
    labelName: label.labelName,
    status: results[0].status, // Since it's bulk delete, the status will be the same for all
  }));

  await csvWriter.writeRecords(csvData);
  console.log('CSV file has been processed and saved as output.csv');
};

// Run the script
deleteActionLabels();