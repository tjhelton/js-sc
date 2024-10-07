# Delete ALL Action Labels In Bulk

This script deletes all action labels that exist in the SC environment. There is no input file as we make a call to fetch all label IDs. The results are saved in an `output.csv` file, indicating the status of each action label deletion.

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
   ```

## Configuration

1. Replace "TOKEN_HERE" with your SC bearer token 

    ```bash
    const bToken = 'TOKEN_HERE';
    ```


## Usage

1. Run the script:

    ```bash
    node index.mjs
    ```

2. Check the output.csv file for the status of each action label deletion:

| labelId | labelName | status |
|--------|--------|----------|
| 123e4567-e89b-12d3-a456-426614174000  | Label 1 | SUCCESS |
| 789e4567-e89b-12d3-a456-426614174111  | Label 2 | ERROR |



