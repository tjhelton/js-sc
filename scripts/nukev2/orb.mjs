const records = [
    'cd313064-857b-4185-91e4-e7b05ea194a8',
    'f52d6c43-71e8-45d0-bf80-6e695f3c6aee',
    'af031b6e-4116-4711-b54d-b2f9190a4a68'
]

function logList(item){
    
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer 5a0ed9950fda1ba92960a0171bb2bc70ef0449ff2c896aaf86d1607cb36ce5a4'
        },
        body: JSON.stringify({ids: item})
      };
      
      fetch('https://api.safetyculture.io/tasks/v1/actions/delete', options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}

logList(records)