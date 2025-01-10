import { writeFileSync } from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.TOKEN

const url = 'https://api.safetyculture.io'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'sc-integration-id': 'sc-readme',
    authorization: `Bearer ${token}`
  }
};

async function getAssets() {
    let assets = []
    let appendUrl = '/feed/assets'
    let page = 1
    while(appendUrl !== null) {
      const response = await fetch(`${url}${appendUrl}`,options)
      const json = await response.json()
      console.log(`fetching page ${page}...`)
      page++
      for(const asset of json.data) {
        if(asset.state !== 'ASSET_STATE_ARCHIVED'){
          assets.push(asset.id)
        } else {
          //skip
        }
      }
      appendUrl = json.metadata.next_page
    }
    return assets
};

async function main(){
  const assets = await getAssets()
  writeFileSync('assets.json', JSON.stringify(assets, null, 2));
};

main()
