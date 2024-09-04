//replace the array at line 2 with the results from the SQL query in the README!
const records = []
const token = process.argv[2]

async function archive (audit) {
    console.log('archiving ' + audit + ' ...')
    await fetch(`https://api.safetyculture.io/inspections/v1/inspections/${audit}/archive`,
        {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'sc-integration-id': 'sc-readme',
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            }
        }
    )
}

async function unarchive (audit) {
    console.log('unarchiving ' + audit + ' ...')
    await fetch(`https://api.safetyculture.io/inspections/v1/inspections/${audit}/archive`,
        {
            method: 'DELETE',
            headers: {
                accept: 'application/json',
                'sc-integration-id': 'sc-readme',
                authorization: `Bearer ${token}`
            }
        }
    )
}

async function fullProc (audit) {
    const getUrl = `https://api.safetyculture.io/audits/${audit}`
    const getOptions = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }}
    const getIns = await fetch(getUrl,getOptions)
    const insData = getIns.json()
    if(insData.archived === 'true') {
        console.log(`${audit} already archived... skipping...`)
    } else {
        await archive(audit)
        await unarchive(audit)
    }
}

//this is ro lazily nesting the whole async function above in another function to ensure each record is archived / unarchived in order...
async function processRecords(records) {
    for (const audit of records) {
        await fullProc(audit);
    }
}

processRecords(records)
