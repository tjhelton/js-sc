# Node.js Scripts for Customer Success Engineers

## Description
Welcome to the sharingan repository. These scripts are designed to help Customer Success Engineers interact with the SafetyCulture API, either for internal support or customers. Whether you're new to the team or looking to refine your skills, this repository offers valuable resources to get you started with automating.

This repository will mostly utilize nodeJS (because we are raised by web developers), but feel free to utilize programming langagues you are comfortable in. In those cases, please consider limitations that may be present when someone wishes to utilize your scripts (virtual environments, etc.) and provide exceptional documentation.

## Table of Contents
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Clone the Repo!](#clone-the-repo!)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Getting Started
To get started, follow the instructions below to set up your environment.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- Access to the SafetyCulture API (Bearer token for customer)

## Clone the Repo!
Navigate to the desired path on your local machine and clone the repository:
   ```bash
   git clone https://github.com/tjhelton/js-sc.git
   ```

## Usage
Each script in this repository serves a specific purpose. Refer to the scripts README on how to use the script.

## Contributing

We welcome contributions from the team! If you have a new script or an enhancement to an existing one, please follow these guidelines:

### Contribution Workflow

This repository requires pull requests for all changes to the `main` branch. Follow these steps:

1. **Create a feature branch**
   ```bash
   git checkout -b <descriptive-branch-name>
   ```

2. **Make your changes**
   - Add new scripts or modify existing ones
   - Update documentation as needed

3. **Lint your code**
   ```bash
   npm run lint          # Lint all files
   npm run lint:fix      # Auto-fix linting issues
   npx eslint <file>     # Lint specific file
   ```

4. **Stage and commit your changes**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

5. **Push your branch**
   ```bash
   git push origin <branch-name>
   ```

6. **Create a Pull Request**
   - Navigate to the repository on GitHub
   - Create a PR from your branch to `main`
   - Ensure the `lint` status check passes
   - Request review if needed

### Script Authoring Standards

When creating a new script, follow these conventions:

#### File Structure
- **Script file**: `index.mjs`
- **Documentation**: `README.md` (uppercase)
- **Location**: `scripts/<category>/<script-name>/`

#### Script Requirements

1. **API Token Configuration**
   ```javascript
   import dotenv from 'dotenv';
   dotenv.config()

   // API Token - Replace 'YOUR_API_TOKEN_HERE' with your actual token, or use .env file with TOKEN variable
   const token = process.env.TOKEN || 'YOUR_API_TOKEN_HERE'
   ```

2. **Standard Imports**
   - Use ES modules (`import/export`)
   - Include necessary dependencies (dotenv, csv-parser, csv-writer, etc.)

3. **Input/Output**
   - Default input: `input.csv`
   - Default output: `output.csv`
   - Document expected CSV format in README

4. **Error Handling**
   - Log errors to console
   - Write errors to output CSV with status messages
   - Use descriptive error messages

#### README Requirements

Every script must include a `README.md` with the following sections:

```markdown
# Script Name

Brief description of what the script does.

## Set up:

Installation and configuration steps, including:
- npm install instructions
- .env file setup OR hardcoded token option
- input.csv format and requirements

## Running the script:

Command to execute: `node index.mjs`

## Outputs:

Description of what the script generates (usually output.csv)

## Additional Comments

Any additional notes, limitations, or considerations
```

Use the template in `scripts/readme_template/readme.md` as a starting point.

### Code Style

- Follow ESLint recommended rules (enforced by CI)
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain consistent formatting

### Testing Your Scripts

Before submitting a PR:
1. Test with sample data to ensure functionality
2. Verify error handling works correctly
3. Confirm output format matches documentation
4. Run linter and fix any issues

<3

## Support
Email amer.cse@safetyculture.io if instructions are not clear or incorrect.

"I'll give to you... this Sharingan of mine."
<p align="center">
<img src="sbin/s.gif" height="300" width="300">
</p>