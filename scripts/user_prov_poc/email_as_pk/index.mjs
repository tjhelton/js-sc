import { writeFileSync } from 'fs';

const primaryKey = process.argv[2]

const keys = ['first','last','email','seat'] //change as needed

function createPayload(keys){
  const obj = Object.fromEntries(keys.map(key => [key, "value"]));
  return obj
};

function createCode(primaryKey) { //for this code, whatever key is email should be treated as the primary key

  const workatoExport = `exports.main = async ({ yesterdayData, todayData }) => {
      const yesterdayIndex = new Map(yesterdayData.map(item => [item.${primaryKey}, item]));
      const todayIndex = new Map(todayData.map(item => [item.${primaryKey}, item]));
    
      function getUpdates(today) {
        return today.filter(todItem => {
          const yesItem = yesterdayIndex.get(todItem.${primaryKey})
          if (yesItem) {
            return JSON.stringify(yesItem) !== JSON.stringify(todItem)
          }
          return false
        })
      };
    
      function getCreations(today) {
        return today.filter(todItem => {
          return !yesterdayIndex.get(todItem.${primaryKey})
        })
      };
    
      function getDeletions(yesterday) {
        return yesterday.filter(yesItem => {
          return !todayIndex.get(yesItem.${primaryKey})
        })
      };
    
      const updateRecords = getUpdates(todayData);
      const creationRecords = getCreations(todayData);
      const deletionRecords = getDeletions(yesterdayData);
    
      return {
        updateRecords,
        creationRecords,
        deletionRecords,
      };
    };`

  return workatoExport
};

const payload = createPayload(keys)

const workatoJs = createCode(primaryKey)

if (keys.includes(primaryKey)) {
  const jsonStuff = JSON.stringify(payload, null, 2)
  writeFileSync('workatoJs.txt', workatoJs, 'utf8')
  writeFileSync('jsonSchema.json', jsonStuff, 'utf8')
} else {
  console.log(`${primaryKey} not in keys array!`)
};
