# Create Inspection Schedules In Bulk

This script creates schedules based on parameters provided in the `input.csv` file. The results are saved in an `output.csv` file, indicating the status of each schedule creation.

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

| Description               | mustComplete | canLateSubmit | Recurrence                                  | startTimeHour | startTimeMinute | Duration | Timezone        | fromDate                        | Assignee ID                           | Assignee Type | Document ID                           | Document Type | Location ID                           | Asset ID                               |
|----------------------------------------------|--------------|---------------|---------------------------------------------|---------------|-----------------|----------|-----------------|-----------------------------------|----------------------------------------|---------------|----------------------------------------|---------------|----------------------------------------|----------------------------------------|
| FFE | FEP - Monthly Inspection | 0.1.1        | ONE          | TRUE          | FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z | 7             | 0               | P25D     | America/Chicago | 2024-08-05T00:00:00.000Z         | ae46484a-f1be-47f6-92d8-681ab80beb99   | ROLE          | template_e5b4a7e1d3884939ad1da50fcb2c80c8 | TEMPLATE      | 3e1084b4-5ce6-4cf2-9df0-88317f44ffa6   | 3a479eb9-f5f6-485a-991f-60e5e772347d   |
| FFE | FEP - Monthly Inspection | 0.1.2        | ONE          | TRUE          | FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z | 7             | 0               | P25D     | America/Chicago | 2024-08-05T00:00:00.000Z         | ae46484a-f1be-47f6-92d8-681ab80beb99   | ROLE          | template_e5b4a7e1d3884939ad1da50fcb2c80c8 | TEMPLATE      | 3e1084b4-5ce6-4cf2-9df0-88317f44ffa6   | db0a0ee2-a3f2-4768-852e-3b1acc9a0e4e   |

2. Run the script:

    ```bash
    node index.mjs

3. Check the output.csv file for the status of each schedule:

| Description               | mustComplete | canLateSubmit | Recurrence                                  | startTimeHour | startTimeMinute | Duration | Timezone        | fromDate                        | Assignee ID                           | Assignee Type | Document ID                           | Document Type | Location ID                           | Asset ID                               | Status  |
|----------------------------------------------|--------------|---------------|---------------------------------------------|---------------|-----------------|----------|-----------------|-----------------------------------|----------------------------------------|---------------|----------------------------------------|---------------|----------------------------------------|----------------------------------------|---------|
| FFE | FEP - Monthly Inspection | 0.1.1        | ONE          | TRUE          | FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z | 7             | 0               | P25D     | America/Chicago | 2024-08-05T00:00:00.000Z         | ae46484a-f1be-47f6-92d8-681ab80beb99   | ROLE          | template_e5b4a7e1d3884939ad1da50fcb2c80c8 | TEMPLATE      | 3e1084b4-5ce6-4cf2-9df0-88317f44ffa6   | 3a479eb9-f5f6-485a-991f-60e5e772347d   | SUCCESS |
| FFE | FEP - Monthly Inspection | 0.1.2        | ONE          | TRUE          | FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z | 7             | 0               | P25D     | America/Chicago | 2024-08-05T00:00:00.000Z         | ae46484a-f1be-47f6-92d8-681ab80beb99   | ROLE          | template_e5b4a7e1d3884939ad1da50fcb2c80c8 | TEMPLATE      | 3e1084b4-5ce6-4cf2-9df0-88317f44ffa6   | db0a0ee2-a3f2-4768-852e-3b1acc9a0e4e   | ERROR   |