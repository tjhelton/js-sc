import neatCSV from 'neat-csv';
import fs from 'fs/promises';

const token = process.argv[2]

async function createGroups(name) {
    const url = 'https://api.safetyculture.io/groups'
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer ' + token
        },
        body: JSON.stringify({name: name})
      };

    await fetch(url,options)
    .then(console.log('group called ' + name + ' created!'))
}

async function reader(csvName) {
    const csvRaw = (await fs.readFile(csvName)).toString();
    const csv = await neatCSV(csvRaw);
    return csv;
  };

//create user array outside of reader function
const groups = await reader('groupNames.csv');
  
for (const row of groups) {
await createGroups(row.names);
};
