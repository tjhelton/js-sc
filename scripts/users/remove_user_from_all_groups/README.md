# Remove User From All Groups In Bulk

This script removes users provided in the `input.csv` file from all groups of which they may be a member. The results are saved in an `output.csv` file, indicating the status of each user/group removal.

## Overview

The script reads user IDs from `input.csv`, retrieves all groups associated with each user, removes the user from those groups via API, and logs the results in `output.csv`.

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
   ```

## Configuration

1. Replace "TOKEN_HERE" with your SC bearer token 

    ```bash
    const bToken = 'TOKEN_HERE';
    ```


## Usage

1. Prepare an input.csv file with the following format:
    
| userId |
|--------|
| 12345  |
| 67890  |

2. Run the script:

    ```bash
    node index.mjs
    ```

3. Check the output.csv file for the status of each user ID:

| userId | status  |
|--------|---------|
| 12345  | SUCCESS |
| 67890  | ERROR   |


