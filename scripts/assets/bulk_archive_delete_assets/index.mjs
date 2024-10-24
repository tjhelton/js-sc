import neatCsv from 'neat-csv'
import fs from 'fs/promises'
import winston from 'winston'

const assets = (await fs.readFile('input.csv')).toString()
const assetCsv = await neatCsv(assets)
const token = process.argv[2]
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
        new winston.transports.File({
            filename: 'assets.log',
            level: 'info'
        })
    ]
})

async function archiveAndDelete(asset) {
      const deleteUrl = `https://api.safetyculture.io/assets/v1/assets/${asset}`
      const deleteOptions = {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
      };
      const archiveUrl = `https://api.safetyculture.io/assets/v1/assets/${asset}/archive`
      const archiveOptions = {
        method: 'PATCH',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          'content-type': 'application/json',
          authorization: 'Bearer ' + token
        }
      };
      await fetch(archiveUrl, archiveOptions),
      await fetch(deleteUrl, deleteOptions)
      .then(async response => {
        logger.log('info', `${asset} | ${response.statusText}`)
      });
};

for (const row of assetCsv) {
    await archiveAndDelete(row.assets)
}
