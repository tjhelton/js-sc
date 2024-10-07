# Move Sites to a New Parent In Bulk

This script moves existing sites to a new parent based on the site IDs and new parent IDs provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each site move operation.

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
   ```

## Configuration

1. Replace "TOKEN_HERE" with your SC bearer token 

    ```bash
    const bToken = 'TOKEN_HERE';
    ```


## Usage

1. Prepare an input.csv file with the following format:
    
| siteId | parentId |
|--------|--------|
| 09876  |  12345 |
| 67890  | 54321  |


2. Run the script:

    ```bash
    node index.mjs
    ```

3. Check the output.csv file for the status of each moved site:

| siteId | parentId | status  |
|--------|--------|---------|
| 09876  | 12345  | SUCCESS |
| 67890  | 54321 | ERROR   |
