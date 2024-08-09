# Bulk Create Inspections
The purpose of this script is to create inspections in bulk for the purpose of demonstrations. This is helpful for when we are wanting to create hundreds to thousands of records on a demo account.

## Set up:
This script runs with pure vanilla JS. See the comments in the script and files such as `examplePayload.txt` in this directory to assist.

## Running the script:
Once the set up is complete, run the following command in a terminal:
`node index.mjs <token> <template_id> <number of inspections to make`

## Outputs:
None

## Notes for / from Ro:
Bear in mind that logic-driven questions take a little more setup. For these types of demonstrations, hopefully we can avoid logic - but if you must use logic, try to demonstrate the top layer question alone. If you want to show subsequent questions with answers, this script will have to be altered to account for that.