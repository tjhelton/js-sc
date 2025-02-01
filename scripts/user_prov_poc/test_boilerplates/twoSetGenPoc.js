
const primaryKey = process.argv[2]
const emailKey = process.argv[3]

function createCode(primaryKey,emailKey) {

  const workatoExport = `exports.main = async ({ yesterdayData, todayData }) => {
      const yesterdayIndex = new Map(yesterdayData.map(item => [item.${primaryKey}, item]));
      const todayIndex = new Map(todayData.map(item => [item.${primaryKey}, item]));
    
      function getUpdates(today) {
        return today.filter(todItem => {
          const yesItem = yesterdayIndex.get(todItem.${primaryKey})
          if (yesItem) {
            if (yesItem.${emailKey} !== todItem.${emailKey}) {
              todItem['OldEmail'] = yesItem.${emailKey}
            }
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

createCode(primaryKey,emailKey)
