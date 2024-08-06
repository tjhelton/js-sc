import neatCSV from 'neat-csv';
import fs from 'fs/promises';
import { writeFileSync } from 'fs';

async function reader(csvName) {
  const csvRaw = (await fs.readFile(csvName)).toString();
  const csv = await neatCSV(csvRaw);
  return csv;
}

async function createBlock(item){
    const reformed = {
        "name": item,
        "type": "string",
        "optional": true,
        "label": item,
        "details": {
          "real_name": item
        },
        "control_type": "text"
      }
    output.push(reformed)
}

let output = []

const keys = await reader('keys.csv');

for (const row of keys) {
  await createBlock(row.keys);
};

const jsonStuff = JSON.stringify(output, null, 2)
writeFileSync('jsonSchema.json', jsonStuff, 'utf8');

console.log('copy the contents of jsonSchema.json and paste in workato!')