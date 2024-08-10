# Update Site Names In Bulk

This script updates site name based on site IDs + newNames provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each site name update.

## Overview

The script reads site IDs + newNames from `input.csv`, sends a request to update each site name via API, and logs the results to `output.csv`.

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
    
| siteId | newName |
|--------|--------|
| 12345  | Site Name 1  |
| 67890  | Site Name 2  |


2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each site ID + newName:

| siteId | newName | status  |
|--------|--------|---------|
| 12345  | Site Name 1  | SUCCESS |
| 67890  | Site Name 2  | ERROR   |



