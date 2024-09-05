import { promises as fs } from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

const jsonFileName = process.argv[2]

async function jsonToCsv(jsonFilePath, csvFilePath) {
  try {

    const data = await fs.readFile(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(data);


    const headers = Object.keys(jsonData[0]).map(key => ({ id: key, title: key }));


    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: headers,
    });


    await csvWriter.writeRecords(jsonData);

    console.log(`CSV file created successfully at ${csvFilePath}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

const jsonFilePath = path.join(jsonFileName + '.json')
const csvFilePath = path.join('activityLog.csv')

jsonToCsv(jsonFilePath, csvFilePath);
