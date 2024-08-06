# Inspection Site Update Script

## Overview

This Node.js script processes a CSV file containing inspection records, updates each inspection with a new site ID through the SafetyCulture API, and writes the results to a new CSV file.

## Prerequisites

- Node.js installed
- `npm` (Node Package Manager)

## Dependencies

The script uses the following npm packages:

- `fs` (File System) for file operations
- `csv-parser` for parsing CSV files
- `csv-writer` for writing CSV files
- `node-fetch` for making HTTP requests

Install these dependencies by running:

```sh
npm install fs csv-parser csv-writer node-fetch
