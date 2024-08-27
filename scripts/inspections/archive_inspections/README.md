# Archive Inspections In Bulk

This script archives inspections based on audit IDs provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each archive request.

## Overview

The script reads audit IDs from `input.csv`, sends a request to archive each audit via an API, and logs the results to `output.csv`.

## Prerequisites

- Node.js (>= 20.x)
- Required npm packages:
  - `fs`
  - `csv-parser`
  - `csv-writer`
  - `node-fetch`

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

1. Prepare an input.csv file with the following format:
    
| auditId |
|--------|
| 12345  |
| 67890  |

2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each audit ID:

| auditId | status |
|--------|--------|
| 12345  | SUCCESS |
| 67890  | ERROR  |


