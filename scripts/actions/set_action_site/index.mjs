import neatCSV from 'neat-csv';
import fs from 'fs/promises';

const token = process.argv[2]

async function setSite(action, site) {
    const url = `https://api.safetyculture.io/tasks/v1/actions/${action}/site`
    const options = {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer ' + token
        },
        body: JSON.stringify({site_id: {value: site}})
      };

    await fetch(url,options)
    .then(console.log('action ' + action + ' site changed to ' + site))
}

async function reader(csvName) {
    const csvRaw = (await fs.readFile(csvName)).toString();
    const csv = await neatCSV(csvRaw);
    return csv;
  };

//create action array outside of reader function
const actions = await reader('actions.csv');
  
for (const row of actions) {
await setSite(row.action_id,row.site_id);
};
