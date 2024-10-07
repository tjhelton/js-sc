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
   ```

## Configuration

1. Replace "TOKEN_HERE" with your SC bearer token 

    ```bash
    const bToken = 'TOKEN_HERE';
    ```

## Usage

1. Prepare an input.csv file with the following format:

|description|mustComplete                 |canLateSubmit|recurrence                                   |startTimeHour|startTimeMinute|duration|timezone       |fromDate  |assigneeId                          |assigneeType|documentId                               |documentType|locationId                          |assetId                             |
|-----------|-----------------------------|-------------|---------------------------------------------|-------------|---------------|--------|---------------|----------|------------------------------------|------------|-----------------------------------------|------------|------------------------------------|------------------------------------|
|FEP - Monthly Inspection 0.1.1|ONE                          |TRUE         |FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z|7            |0              |P25D    |America/Chicago|2024-08-05|ae46484a-f1be-47f6-92d8-681ab80beb99|ROLE        |template_e5b4a7e1d3884939ad1da50fcb2c80c8|TEMPLATE    |3e1084b4-5ce6-4cf2-9df0-88317f44ffa6|3a479eb9-f5f6-485a-991f-60e5e772347d|
|FEP - One-Off Inspection 0.1.2|ONE                          |TRUE         |FREQ=DAILY;INTERVAL=1;DTSTART=20240805T130000Z;COUNT=1|7            |0              |P3D     |America/Chicago|2024-08-05|ae46484a-f1be-47f6-92d8-681ab80beb99|ROLE        |template_e5b4a7e1d3884939ad1da50fcb2c80c8|TEMPLATE    |3e1084b4-5ce6-4cf2-9df0-88317f44ffa6|db0a0ee2-a3f2-4768-852e-3b1acc9a0e4e|


2. Run the script:

    ```bash
    node index.mjs
    ```

3. Check the output.csv file for the status of each schedule:

|description|mustComplete                 |canLateSubmit|recurrence                                   |startTimeHour|startTimeMinute|duration|timezone       |fromDate  |assigneeId                          |assigneeType|documentId                               |documentType|locationId                          |assetId                             |status |
|-----------|-----------------------------|-------------|---------------------------------------------|-------------|---------------|--------|---------------|----------|------------------------------------|------------|-----------------------------------------|------------|------------------------------------|------------------------------------|-------|
|FEP - Monthly Inspection 0.1.1|ONE                          |TRUE         |FREQ=MONTHLY;INTERVAL=1;DTSTART=20240805T130000Z|7            |0              |P25D    |America/Chicago|2024-08-05|ae46484a-f1be-47f6-92d8-681ab80beb99|ROLE        |template_e5b4a7e1d3884939ad1da50fcb2c80c8|TEMPLATE    |3e1084b4-5ce6-4cf2-9df0-88317f44ffa6|3a479eb9-f5f6-485a-991f-60e5e772347d|SUCCESS|
|FEP - One-Off Inspection 0.1.2|ONE                          |TRUE         |FREQ=DAILY;INTERVAL=1;DTSTART=20240805T130000Z;COUNT=1|7            |0              |P3D     |America/Chicago|2024-08-05|ae46484a-f1be-47f6-92d8-681ab80beb99|ROLE        |template_e5b4a7e1d3884939ad1da50fcb2c80c8|TEMPLATE    |3e1084b4-5ce6-4cf2-9df0-88317f44ffa6|db0a0ee2-a3f2-4768-852e-3b1acc9a0e4e|ERROR  |
