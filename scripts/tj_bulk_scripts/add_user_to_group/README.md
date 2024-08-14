# Add Users To A In Bulk

This script adds users to a group based on user IDs + group IDs provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each group addition.

## Overview

The script reads user IDs + group IDs from `input.csv`, sends a request to add each user to each group via API, and logs the results to `output.csv`.

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
    
| userId | groupId |
|--------|--------|
| 12345  | 54321  |
| 67890  | 09876  |

2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each user ID + group ID:

| userId | groupId | status  |
|--------|--------|---------|
| 12345  | 54321  | SUCCESS |
| 67890  | 09876  | ERROR   |


