exports.main = async ({ yesterdayData, todayData }) => {
    const yesterdayIndex = new Map(yesterdayData.map(item => [item.empId, item]));
  
    function getCreations(today) {
      return today.filter(todItem => {
        return !yesterdayIndex.get(todItem.empId)
      })
    };

    const creationRecords = getCreations(todayData);
  
    return {
      creationRecords
    };
  };
  ///

exports.main = async ({ scData, cusData }) => {
    const scIndex = new Map(scData.map(item => [item.name, item]));
    
    function getCreations(customerData) {
        return customerData.filter(customerDataItem => {
            return !scIndex.get(customerDataItem.name)
        })
    };
    
    const creationRecords = getCreations(cusData);
    
    return {
        creationRecords
    };
};