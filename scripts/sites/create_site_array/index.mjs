import { writeFileSync } from 'fs';

const token = process.argv[2]

async function getSites () {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'sc-integration-id': 'sc-readme',
          authorization: 'Bearer ' + token
        }
      }
    try {
      const response = await fetch(`https://api.safetyculture.io/feed/sites`,options)
      if(!response.ok) {
        throw new Error(`data fetch error! Status: ${response.status}`)
      }
      const responseJson = await response.json()
      return responseJson.data
    }catch (error) {
      console.error('Failed to fetch sites:', error)
      return null
    }
}

async function main(){
  const sites = await getSites()
  const outputArray = sites.map(item => item.id);
  writeFileSync('sites.json', JSON.stringify(outputArray, null, 2));
}

main()
