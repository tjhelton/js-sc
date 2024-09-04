//replace the array at line 2 with the results from the SQL query in the README!
const records = []
const token = process.argv[2]

async function checkAndRetrig (audit) {
    const getUrl = `https://api.safetyculture.io/audits/${audit}`
    const getOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
    }
    try {
        const getIns = await fetch(getUrl,getOptions)
        const insData = getIns.json()

        if (insData.archived === 'true') {
            console.log(`${audit} is already archived. This record will be skipped...`)
        } else {
            const archiveUrl = `https://api.safetyculture.io/inspections/v1/inspections/${audit}/archive`;
            const archiveOps = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'sc-integration-id': 'sc-readme',
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                }
            }
            const unArchiveOps = {
                method: 'DELETE',
                headers: {
                    accept: 'application/json',
                    'sc-integration-id': 'sc-readme',
                    authorization: `Bearer ${token}`
                }
            }
            console.log(`archiving ${audit}...`)
            await fetch (archiveUrl,archiveOps)
            console.log(`unarchiving ${audit}...`)
            await fetch (archiveUrl,unArchiveOps)
            
        }
    } catch (error) {
        console.error(`error processing ${audit}...`, error)
    }
    
}
//this is ro lazily nesting the whole async function above in another function to ensure each record is archived / unarchived in order...
async function processRecords(records) {
    for (const audit of records) {
        await checkAndRetrig(audit);
    }
}

processRecords(records);
