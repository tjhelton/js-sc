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
            filename: 'completed.log',
            level: 'info'
        })
    ]
})

async function completeInspections(audit,complete) {
      await fetch(`https://api.safetyculture.io/inspections/v1/inspections/${audit}/complete`,{
        method: "POST",
        headers: {
            accept: 'application/json',
            'sc-integration-id': 'sc-readme',
            'content-type': 'application/json',
            authorization: 'Bearer ' + token
          },
        body: JSON.stringify({timestamp: complete })
      })
      .then(response => response.json())
            logger.log('info',`${audit} | ${complete}`)
        }   

for (const row of inspectionsCsv) {
    await completeInspections(row.inspection,row.date)
}
