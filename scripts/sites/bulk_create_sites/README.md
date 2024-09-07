# Create Sites In Bulk

This script creates new sites in bulk based on the site names and parent IDs provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each site creation.

## Prerequisites

- Node.js (>= 20.x)
- Required npm packages:
  - `fs`
  - `csv-parser`
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

1. Prepare an input.csv file with the following format:
    
| siteName | parentId |
|--------|--------|
| Site Name 1  |  12345 |
| Site Name 2  | 54321  |


2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each new site:

| siteName | parentId | status  |
|--------|--------|---------|
| Site Name 1  | 12345  | SUCCESS |
| Site Name 2  | 54321 | ERROR   |
