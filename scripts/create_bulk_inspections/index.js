
const token = process.argv[2]
const templateId = process.argv[3]
const helperList = process.argv[4]
const url = 'https://api.safetyculture.io/audits'

//create as many arrays as needed for answer sets so that you can use a random answer
const sites = ['location_9b22b353d5a84a21a4c3da953dfff58d', 'location_51361367d3464ab3b92be3863f13f57a', 'location_3b11619cd73d45f6b667d36a62013391', 'location_23687f9210104821969b5ea1ead91bde', 'location_6c6e066d4fcd4cf5a1661fb284b7ba55', 'location_8ecb03c14d69445da8be7d6cf67bf6bc', 'location_515f1fd9f0b54681ba2e3694db797161', 'location_b9716a100166455d86ad3f9281604ba0', 'location_373804631e1a4bb9b23c9a6789b7947d']
const answerSetOne = [
    '3ed561b5-e01d-429c-afed-63f10a7f16e5',
    'cfc400c9-9f3c-46a1-92f1-a563dd8c1adf',
    '8d899069-1d46-4849-bd67-ed60cd52da21',
    'd183d79e-57e8-42a8-b8c4-3e5f9dea8a19',
    'c585cf6b-0458-41e2-b548-b14e468f259a',
    '71287ace-6008-4ad6-959f-c88c05b4b5fe']
const answerSetTwo = [
    'Red',
    'Orange',
    'Blue',
    'Green',
    'Purple']

async function createInspections(iterations) {
    for (let i = 0; i < iterations; i++) {
        
        //edit times on lines 27 and 28 for time constraints
        const startDate = new Date('2024-08-01T00:00:00.000Z').getTime();
        const endDate = new Date('2024-08-07T23:59:59.999Z').getTime();
        const randomTimestamp = new Date(startDate + Math.random() * (endDate - startDate)).toISOString();
        const randomSite = sites[Math.floor(Math.random() * sites.length)]
        //put answer variables here considering arrays
        const answerOne = answerSetOne[Math.floor(Math.random() * answerSetOne.length)]
        const answerTwo = answerSetTwo[Math.floor(Math.random() * answerSetTwo.length)]


            const callOptions = {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  authorization: 'Bearer ' + token
                },
        //paste a JSON schema mapping the Ids and responses as necessary. see examplePayload.txt for a breakdown
                body: JSON.stringify({
                     template_id: templateId,
                     header_items: [
                        {
                          responses: {time: randomTimestamp},
                          item_id: 'f3245d42-ea77-11e1-aff1-0800200c9a66'
                        }
                      ],
                     items: [
                        {
                          type: 'list',
                          responses: {selected: [{id: answerOne}]},
                          item_id: 'ab2f36d3-26f2-402e-b542-c11a705a7ba3'
                        },
                        {
                          type: 'text',
                          responses: {text: answerTwo},
                          item_id: 'fad585f9-7772-47d0-8490-600b019420ab'
                        }
                      ]
                    })
              };
            await fetch(url, callOptions)
            .then(response => response.json())
            .then(data => {
                const newAudit = data.audit_id
                fetch(`https://api.safetyculture.io/inspections/v1/inspections/${newAudit}/site`,{
                    method: 'PUT',
                    headers: {
                      accept: 'application/json',
                      'sc-integration-id': 'sc-readme',
                      'content-type': 'application/json',
                      authorization: 'Bearer ' + token
                    },
                    body: JSON.stringify({site_id: randomSite})
                  })
                  .then(fetch(`https://api.safetyculture.io/inspections/v1/inspections/${newAudit}/complete`,{
                    method: "POST",
                    headers: {
                        accept: 'application/json',
                        'sc-integration-id': 'sc-readme',
                        'content-type': 'application/json',
                        authorization: 'Bearer ' + token
                      },
                    body: JSON.stringify({timestamp: randomTimestamp })
                  })) 
            }
        )
            console.log(`inspection ${i + 1}/${helperList} created!`)
        }}


createInspections(helperList)
