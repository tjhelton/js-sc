# SC Nuke

The purpose of this script is to automate the deletion of all users, groups, sites, assets, schedules, inspections, actions, issues and templates in a SafetyCulture account. This script is intended to be used for demo accounts and must be run by an admin of the account, who will be the sole remaining user in the account.

At the time this script is being written, there is no public deletion endpoint for the heads up feature.

This script utilizes the SC data feeds to create lists of everything that should be deleted. As such, no input is required.

## Set up:

Ensure dependencies are installed by running the below command in the directory of the script:

```bash
npm i
```

Create a .env file with a `TOKEN` parameter as follows:

```bash
TOKEN=5b1d73376dhy2a92960a0171b...
```

## Running the script:

Once the set up is complete, run the following command in a terminal:
`node index.mjs`

## Outputs:

<!-- <output notes> -->

## Additional Comments

<!-- <any additional comments> -->
