const set1 = [
    { id: "ah1234", type: "carrier", name: "destren" },
    { id: "ah1654", type: "dorn", name: "calber" },
    { id: "ah1243", type: "carrier", name: "tellin" },
    { id: "ah1299", type: "carrier", name: "terger" }
  ];
  
  const set2 = [
    { id: "ah1234", type: "carrier", name: "destren" },
    { id: "ah1654", type: "dorn", name: "calber" },
    { id: "ah1243", type: "carbie", name: "tellin" },
    { id: "ah1299", type: "carrier", name: "derpderp" }
  ];
  
  const getDifferences = (setA, setB) => {
    
    const setAIndex = new Map(setA.map(item => [item.id, item]));
  
    
    return setB.filter(bItem => {
      const aItem = setAIndex.get(bItem.id);
      if (aItem.name !== bItem.name) {
        bItem['old_name'] = aItem.name 
      }
      return aItem && JSON.stringify(aItem) !== JSON.stringify(bItem);
    });
  };
  
  const differences = getDifferences(set1, set2);
  console.log(differences);
  