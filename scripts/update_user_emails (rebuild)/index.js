const fs = require('fs');
const csv = require('csv-parser');
const token = process.argv[2]

async function updateEmail(csvFilePath) {
  try {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', async (row) => {
        const userId = row['userId'];
        const email = row['email']
        const apiUrl = `https://api.safetyculture.io/users/${userId}`;
        const options = {
            method: 'PUT',
            headers: {
              accept: 'application/json',
              'sc-integration-id': 'sc-readme',
              'content-type': 'application/json',
              authorization: 'Bearer ' + token
            },
            body: JSON.stringify({new_email: email})
        }
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const data = await response.json();
          results.push(data);
        } else {
          console.error(`Error changing users email ${userId}`);
        }
      })
      .on('end', () => {
        console.log('API calls completed');
      });
  } catch (error) {
    console.error(error);
  }
}

const csvFilePath = 'users.csv';
updateEmail(csvFilePath);
