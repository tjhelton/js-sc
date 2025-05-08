import dotenv from 'dotenv';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import readline from 'readline';
dotenv.config();



const outputCsvPath = 'output.csv';

const csvWriter = createCsvWriter({
  path: outputCsvPath,
  header: [
    { id: 'feature', title: 'feature' },
    { id: 'records', title: 'records' },
    { id: 'deleted', title: 'deleted' },
    { id: 'errors', title: 'errors' }
  ],
});

async function writer(feature, records, deleted, errors){
    const record = [
      {
        feature: feature,
        records: records,
        deleted: deleted,
        errors: errors
      }
    ]
    await csvWriter.writeRecords(record)
  };

const baseUrl = 'https://api.safetyculture.io'

const token = process.env.TOKEN

const feedOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    }
  };

const feeds = [
    {
        feed: 'templates',
        url: '/feed/templates?archived=both'
    },
    {
        feed: 'inspections',
        url: '/feed/inspections?archived=both&completed=both'
    },
    {
        feed: 'schedules',
        url: '/feed/schedules'
    },
    {
        feed: 'actions',
        url: '/feed/actions'
    },
    {
        feed: 'assets',
        url: '/feed/assets'
    },
    {
        feed: 'issues',
        url: '/feed/issues'
    },
    {
        feed: 'sites',
        url: '/feed/sites'
    },
    {
        feed: 'groups',
        url: '/feed/groups'
    },
    {
        feed: 'users',
        url: '/feed/users'
    }
]

async function createList(feed,url){
    let ammendUrl = url
    let iteration = 1
    const list = []
    while(ammendUrl !== null){
        const response = await fetch(`${baseUrl}${ammendUrl}`,feedOptions)
        if(!response.ok) {
            console.log(`page ${iteration} fetch failed! Next Page:${ammendUrl}`)
            iteration++
        } else {
            console.log(`${feed}: page ${iteration} fetched!`)
            iteration++
            const json = await response.json()
            for(const record of json.data){
                list.push(record.id)
            }
            ammendUrl = json.metadata.next_page
        }
    }
    return list
};

async function deleteTemplates(id){
    const url = `https://api.safetyculture.io/templates/v1/template:DeleteTemplateByID?template_id=${id}`
    const options = {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`
        }
      }

      const response = await fetch(url,options)
      if(!response.ok) {
        console.log(`error deleting ${id}...`)
        return 'error'
      } else {
        console.log(`error deleting ${id}...`)
        return 'success'
      }
};

async function archiveIns(ins) {
    const ammendUrl = `/inspections/v1/inspections/${ins}/archive`
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    };
  
    const response = await fetch(`${url}${ammendUrl}`,options)
    if(!response.ok) {
      console.log(`${ins} failed to archive...`)
      return 'error'
    } else {
      console.log(`${ins} archived...`)
      return 'success'
    }
};

async function deleteIns(ins) {
    const ammendUrl = `/inspections/v1/inspections/${ins}`
    const options = {
      method: 'DELETE',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${token}`
      }
    };
  
    const response = await fetch(`${url}${ammendUrl}`,options)
    if(!response.ok) {
      console.log(`${ins} failed to delete...`)
      return 'error'
    } else {
      console.log(`${ins} deleted...`)
      return 'success'
    }
};
  
async function archiveAndDeleteInspections (ins) {
    const archival = await archiveIns(ins)
    if(archival === 'success'){
        const deletion = await deleteIns(ins)
        if(deletion === 'success') {
            return 'success'
        } else {
            return 'error'
        }
    } else return 'error'
};

async function deleteSchedules(id) {
    const ammendUrl = `/schedules/v1/schedule_items/${id}`
    const options = {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`
        }
      }
    const response = await fetch(`${url}${ammendUrl}`,options)
    if (!response.ok){
        console.log(`error deleting schedule ${id}...`)
        return 'error'
    } else {
        console.log(`deleted schedule ${id}...`)
        return 'success'
    }
};

async function deleteActions(actionList) {
    const ammendUrl = '/tasks/v1/actions/delete'
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ids: actionList})
    }

    const response = await fetch(`${url}${ammendUrl}`,options)
    if(!response.ok){
      console.log(`error deleting actions`)
      return 'error'
    } else {
      console.log('actions deleted successfully')
      return 'success'
    }
};

async function archiveAsset(asset) {
  const ammendUrl = `/assets/v1/assets/${asset}/archive`
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`${asset} failed to archive...`)
    return 'error'
  } else {
    console.log(`${asset} archived...`)
    return 'success'
  }
};

async function deleteAsset(asset) {
  const ammendUrl = `/assets/v1/assets/${asset}`
  const options = {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok) {
    console.log(`${asset} failed to delete...`)
    return 'error'
  } else {
    console.log(`${asset} deleted...`)
    return 'success'
  }
};

async function archiveAndDeleteAssets (asset) {
  const archival = await archiveAsset(asset)
  if(archival === 'success'){
      const deletion = await deleteAsset(asset)
      if(deletion === 'success') {
          return 'success'
      } else {
          return 'error'
      }
  } else return 'error'
};

async function deleteIssues(issueList) {
  const ammendUrl = '/tasks/v1/incidents/delete'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ids: issueList})
  }

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    console.log(`error deleting issues`)
    return 'error'
  } else {
    console.log('issues deleted successfully')
    return 'success'
  }
};

async function deleteGroups(groupList){
  ammendUrl = '/accounts/organisation/v1/accounts:BulkDeleteGroups'
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ids: groupList})
  }

  const response = await fetch(`${url}${ammendUrl}`,options)
  if(!response.ok){
    console.log(`error deleting groups`)
    return 'error'
  } else {
    console.log('groups deleted successfully')
    return 'success'
  }
};

//sites to be added - this needs to delete from the top down and delete country, state, then area, sites

//users will be added at somepoint. not spinning up user demos quite yet.

const validation = crypto.randomUUID().split('-')[0]

const templates = await createList(feeds[0].feed,feeds[0].url)//
const templatesCount = templates.length

const inspections = await createList(feeds[1].feed,feeds[1].url)//
const inspectionsCount = inspections.length

const schedules = await createList(feeds[2].feed,feeds[2].url)//
const schedulesCount = schedules.length

const actions = await createList(feeds[3].feed,feeds[3].url)//
const actionsCount = actions.length

const assets = await createList(feeds[4].feed,feeds[4].url)//
const assetsCount = assets.length

const issues = await createList(feeds[5].feed,feeds[5].url)//
const issuesCount = issues.length

// const sites = await createList(feeds[6].feed,feeds[6].url)
// const sitesCount = sites.length

const groups = await createList(feeds[7].feed,feeds[7].url)//
const groupsCount = groups.length

// currently not using delete users
// const users = await createList(feeds[8].feed,feeds[8].url)
// const usersCount = users.length

console.log(
`The following records counts are queued for deletion:
    Templates: ${templatesCount}
    Inspections: ${inspectionsCount}
    Schedules: ${schedulesCount}
    Actions: ${actionsCount}
    Assets: ${assetsCount}
    Issues: ${issuesCount}
    Groups: ${groupsCount}`
)

// removed these from the log for now
// Sites: ${sitesCount}
// Users: ${usersCount}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.question(`to proceed with deletion, type ${validation}: ` , (answer) => {
    if(answer === validation) {
        console.log('verified. proceeding with deletion...')
        rl.close()
        //deletion functions
    } else {
        console.log('incorrect validation. exiting script...')
        rl.close()
        process.exit(1)
    }
  });
