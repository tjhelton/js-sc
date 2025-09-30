import { writeFileSync } from 'fs';
import dotenv from 'dotenv'
dotenv.config()

// API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'

const url = 'https://api.safetyculture.io'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'sc-integration-id': 'sc-readme',
    authorization: `Bearer ${token}`
  }
};

function idVal(str) {
  if (str.includes('location')) {
    const uuid = str.split('_')[1]
    return `${uuid.substr(0, 8)}-${uuid.substr(8, 4)}-${uuid.substr(12, 4)}-${uuid.substr(16, 4)}-${uuid.substr(20)}`
  } else {
    return str
  }
};

async function getAssets() {
    let sites = []
    let appendUrl = '/feed/sites'
    let page = 1
    while(appendUrl !== null) {
      const response = await fetch(`${url}${appendUrl}`,options)
      const json = await response.json()
      console.log(`fetching page ${page}...`)
      page++
      for(const site of json.data) {
        if(site.meta_label === 'location'){
          const newId = await idVal(site.id)
          sites.push(newId)
        } else {
          //skip
        }
      }
      appendUrl = json.metadata.next_page
    }
    return sites
};

async function main(){
  const sites = await getAssets()
  writeFileSync('sites.json', JSON.stringify(sites, null, 2));
};

main()
