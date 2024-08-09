
const token = process.argv[2]
const templateId = process.argv[3]
const helperList = process.argv[4]
const url = 'https://api.safetyculture.io/audits'

//create as many arrays as needed for answer sets so that you can use a random answer
const sites = [
  "location_67345a1ed36b468895200d228f6a55dd",
  "location_31d32ae5f7e04a2ab8da55b93a03ef85",
  "location_30a1e705597a4010b3c869d02aa9b51b",
  "location_d3f8c6a3dd724cc6b369c9593312096f",
  "location_2931fece99bd45eab215494c8253589d",
  "location_384c21f736ff444fa288c6ed827709aa",
  "location_14eb897fd07b44da90c375c2effeeac0",
  "location_ae1d7d89b3ac45d1b557075cadac8eac",
  "location_28e6f65b832841a9b371402e327ded1d",
  "location_5bfcd2a0059e492dbca54c556d8f4b7b",
  "location_6509e5770b0f462bb9926e2172b289b7",
  "location_07911d39f76745088739f4402b877a17",
  "location_23306b2a994743ca86b4cd5f8864a20c",
  "location_932fa00530da4737af4f0ccacad75988",
  "location_c028a7718b6a44649fa68bce534ba76a",
  "location_d97f99996ae1407ba9e1c59b6c0beaf9",
  "location_365b546e87494358b99641eed411e65e",
  "location_1fe5b167a3ea44fe88261bfcf2412151",
  "location_b5f8a42f781f42fab65f31b5020cec94",
  "location_e54192cd1942400097321c0eada713aa",
  "location_0777a91dfbb0459c9be3637cedb5c663",
  "location_d43530975e9c4d909081266019b7201f",
  "location_a7b6f83512094716915e6e7672ef78b7",
  "location_9db15066f89641b4b29fd97e95f7b262",
  "location_6a33fc26cb3d497096350ae8971e969a",
  "location_804571481f124b3ab80aa9ca46aaa053",
  "location_c47efc0957a6416eb1f1a0ba27f0c36a",
  "location_01cb5771935a45708422d9174cb6fc6d",
  "location_4e95b4f0ff6446ceb5f96bcab3d40acd",
  "location_9de453a00df74a4b96f61806006212b1",
  "location_2ad05040a2e24d979eace0167d931533",
  "location_9630ed32c78b457fac1e4537e939aa07",
  "location_49ef88b9dfc24a318769458ca55e2ef9",
  "location_c32a523d485c4b87ab24abe3210b56a5",
  "location_2e4c2454c63246bb861a7c83e938f177",
  "location_6c610d27cce14a8a923ce1706e364761",
  "location_87f0de2fee61443cb26653e632ebbf23",
  "location_0b0470b5cf744ce5a5055177fb883566",
  "location_e08f3bbd69d741e088a7280e09c36d58",
  "location_4671104b42fd47a3a5456188e5f66e1e",
  "location_b3951fdc782244de8a3a0d76c83ac173",
  "location_6b420764047b46fa9769d6137445225c",
  "location_a4cec228845b4a2db45d7e66f43c4512",
  "location_edd58e104c6a49929b028091285aeede"
]
const answerSetOne = [
  'Aaron Hanshaw',
  'Allie Baxter',
  'Gordon Reiz',
  ''
]


const answerSetTwo = [
  'Injury happened on the stairs',
  'Injury happened on the tarmac',
  'bathroom',
  'maintenance closet',
  'food court'
]

const answerSetThree = [
  'employee was doing their daily tasks',
  'employee was playing on their phone',
  'employee was eating in the food court',
  'employee was watching a movie'
]

const answerSetFour = [
  'this is where detail would go that would describe the situation up until the injury'
]

const answerSetFive = [
  //nature of injury
]

const answerSetSix = [
  ////parts of the body were injured
]

const answerSetSeven = [
  //did employee see a doctor?
]

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
