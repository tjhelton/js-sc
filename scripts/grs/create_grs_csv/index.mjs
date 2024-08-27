import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
const csvWriter = createCsvWriter({
    path: 'responses.csv',
    header: [
      {id: 'label', title: 'label'},
      {id: 'id', title: 'id'}
    ]
});

const token = process.argv[2]
const setId = process.argv[3]

async function getResponseSet (item) {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
      }
    try {
      const response = await fetch(`https://api.safetyculture.io/response_sets/${item}`,options)
      if(!response.ok) {
        throw new Error(`data fetch error! Status: ${response.status}`)
      }
      const responseJson = await response.json()
      return responseJson.responses
    }catch (error) {
      console.error('Failed to fetch response set:', error)
      return null
    }
}

const responseSet = await getResponseSet(setId)

csvWriter.writeRecords(responseSet)
