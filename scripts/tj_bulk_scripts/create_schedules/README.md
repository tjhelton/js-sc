# Create Inspection Schedules In Bulk

This script creates schedules based on parameters provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each schedule creation.

## Overview

The script reads schedule parameters from `input.csv`, sends a request to create each schedule via API, and logs the results to `output.csv`.

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
    
| description | mustComplete | canLateSubmit | recurrence | startTimeHour | startTimeMinute | duration | timezone | fromDate | assigneeId | assigneeType | documentId | documentType | locationId | assetId |
|-------------|--------------|---------------|------------|---------------|----------------|----------|----------|----------|------------|--------------|------------|--------------|------------|---------|
| Sample 1    | ONE          | true            | MONTHLY      | 08            | 30             | P7D   | UTC      | 2024-08-01 | 12345      | USER         | 54321      | TEMPLATE       | 11111      | 22222   |
| Sample 2    | ONE           | false           | MONTHLY     | 07            | 00             | 90 min   | EST      | 2024-09-01 | 67890      | ROLE        | 09876      | TEMPLATE       | 33333      | 44444   |



2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each schedule:

| description | mustComplete | canLateSubmit | recurrence | startTimeHour | startTimeMinute | duration | timezone | fromDate    | assigneeId | assigneeType | documentId | documentType | locationId | assetId | status  |
|-------------|--------------|---------------|------------|---------------|----------------|----------|----------|-------------|------------|--------------|------------|--------------|------------|---------|---------|
| Sample 1    | ONE          | true          | MONTHLY    | 08            | 30             | P7D      | UTC      | 2024-08-01  | 12345      | USER         | 54321      | TEMPLATE     | 11111      | 22222   | SUCCESS |
| Sample 2    | ONE          | false         | MONTHLY    | 07            | 00             | 90 min   | EST      | 2024-09-01  | 67890      | ROLE         | 09876      | TEMPLATE     | 33333      | 44444   | ERROR   |




