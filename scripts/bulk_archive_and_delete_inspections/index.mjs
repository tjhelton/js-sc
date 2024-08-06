import neatCsv from 'neat-csv'
import fs from 'fs/promises'
import winston from 'winston'

const inspections = (await fs.readFile('inspections.csv')).toString()
const inspectionsCsv = await neatCsv(inspections)
const token = process.argv[2]
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({
            filename: 'inspections.log',
            level: 'info'
        })
    ]
})

async function archiveAndDelete(ins) {
    const getUrl = `https://api.safetyculture.io/audits/${ins}`
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
      };
      const deleteUrl = `https://api.safetyculture.io/inspections/v1/inspections/${ins}`
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
      };
      const archiveUrl = `https://api.safetyculture.io/inspections/v1/inspections/${ins}/archive`
      const archiveOptions = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          'content-type': 'application/json',
          authorization: 'Bearer ' + token
        }
      };
      await fetch(getUrl,options)
      .then(response => response.json())
      .then(async data => {
        const status = data.archived
      if (status === true) {
        console.log(`deleting ${ins}...`)
        await fetch(deleteUrl,deleteOptions)
        .then(async response => {
            logger.log('info',`${ins} | ${response.statusText}`)
        })
      } else if (status === false) {
        console.log(`archiving and deleting ${ins}...`);
            await fetch(archiveUrl,archiveOptions),
            await fetch(deleteUrl,deleteOptions)
            .then(async response => {
                logger.log('info',`${ins} | ${response.statusText}`)
            })
      }
    })
};

for (const row of inspectionsCsv) {
    await archiveAndDelete(row.inspections)
}

