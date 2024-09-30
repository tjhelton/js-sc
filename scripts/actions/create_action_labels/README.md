# Create Action Labels In Bulk

This script creates action item labels in bulk using the label names provided in `input.csv`. The results are saved in an `output.csv` file, indicating the status of label creation.

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
    
| labelName |
|--------|
| Type 1  |
| Type 2  |

2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each asset ID + site ID:

| labelName | labelId | status  |
|--------|--------|---------|
| Type 1  | 123e4567-e89b-12d3-a456-426614174000  | SUCCESS |
| Type 2  | 789e4567-e89b-12d3-a456-426614174111  | ERROR   |


