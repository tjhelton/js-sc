import { writeFileSync } from 'fs';
import dotenv from 'dotenv'
dotenv.config()

const token = process.env.TOKEN

const url = 'https://api.safetyculture.io'

const setId = process.env.GRS

async function createGrsArray (item) {
  const ammendUrl = `/response_sets/${item}`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'sc-integration-id': 'sc-readme',
      authorization: `Bearer ${token}`
    }
  };
  const response = await fetch(`${url}${ammendUrl}`,options)
  const json = await response.json()
  const ids = json.responses
  const mResponse = ids.map(responseB => responseB.id)
  writeFileSync('grs.json', JSON.stringify(mResponse, null, 2))
};

createGrsArray(setId)
