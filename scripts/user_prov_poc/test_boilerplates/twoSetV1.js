exports.main = async ({ yesterdayData, todayData }) => {
  function getUpdates(yesterday, today) {
    const yesterdayIndex = new Map(yesterday.map(item => [item.id, item]))

    return today.filter(todItem => {
      const yesItem = yesterdayIndex.get(todItem.id)
      if (yesItem) {
        if (yesItem.EmailAddress !== todItem.EmailAddress) {
          todItem['OldEmail'] = yesItem.EmailAddress
        }
        return JSON.stringify(yesItem) !== JSON.stringify(todItem)
      }
      // this should be a deactivation payload because yesterdays is not in today
    });
  };

  const recordsForProc = getUpdates(yesterdayData, todayData);
  return { recordsForProc };
};
