
const token = process.argv[2]
const templateId = process.argv[3]
const helperList = process.argv[4]
const url = 'https://api.safetyculture.io/audits'

//create as many arrays as needed for answer sets so that you can use a random answer
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
    for (let i = 1; i < iterations; i++) {
        //copy the structure here according to the arrays that you add. 25 adn 26 pick random answers in this example.
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
                     items:
                    [
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
            await fetch(url,callOptions)
            console.log(`inspection ${i}/${helperList} created!`)
        }}


createInspections(helperList)
