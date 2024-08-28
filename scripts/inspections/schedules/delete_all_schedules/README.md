# Delete ALL Schedules In Bulk

This script deletes all schedules that exist in the SC environment. There is no input file as we make a call to the schedules datafeed to return ID values for each schedule. The results are saved in an `output.csv` file, indicating the status of each schedule deletion.

## Prerequisites

- Node.js (>= 20.x)
- Required npm packages:
  - `csv-writer`

## Installation

1. Clone or download this repository.
2. Navigate to the project directory.
3. Install the required npm packages:

   ```bash
   npm i

## Configuration

1. Replace "TOKEN_HERE" with your SC bearer token 

    ```bash
    const bToken = 'TOKEN_HERE';


## Usage

1. Run the script:

    ```bash
    node index.mjs

2. Check the output.csv file for the status of each schedule deletion:

| scheduleId | status |
|--------|--------|
| 12345  | SUCCESS |
| 67890  | ERROR |



