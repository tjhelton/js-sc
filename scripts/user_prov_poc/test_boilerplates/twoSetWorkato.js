exports.main = async ({ yesterdayData, todayData }) => {
    const yesterdayIndex = new Map(yesterdayData.map(item => [item.id, item]));
    const todayIndex = new Map(todayData.map(item => [item.id, item]));
  
    function getUpdates(today) {
      return today.filter(todItem => {
        const yesItem = yesterdayIndex.get(todItem.id)
        if (yesItem) {
          if (yesItem.EmailAddress !== todItem.EmailAddress) {
            todItem['OldEmail'] = yesItem.EmailAddress
          }
          return JSON.stringify(yesItem) !== JSON.stringify(todItem)
        }
        return false
      })
    };
  
    function getCreations(today) {
      return today.filter(todItem => {
        return !yesterdayIndex.get(todItem.id)
      })
    };
  
    function getDeletions(yesterday) {
      return yesterday.filter(yesItem => {
        return !todayIndex.get(yesItem.id)
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
  };
  