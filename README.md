# pg-sequelize-rest-api
This project provides a generic REST API based on Express to create, read, update and delete (CRUD) to a postgres database using the sequelize ORM.

## Requirements

- Node.js https://nodejs.org is installed.
- Typescript https://www.typescriptlang.org/ is installed.


## Installation

- Clone the repository
- Switch to the directory and run ``npm install``
- Create an ``.env`` file in the project directory and add your custom values to connect to a database.
- Run ``node run.js``to see next steps.

## .env File
Create an `.env` file in the project directory and add your custom values to connect to a database. 

Example:

```bash
# General environment settings for a database connection

DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=db
DB_HOST=127.0.0.1
```

## run.js File
This script facilitates the migration and seeding process of database structures as provived by `sequelize`. Run the script without arguments to see the options.

The file `setup.json` provides default settings to run the script. 

```bash
node run.js

# Output:
Run this script with one of these arguments: 'create', 'up', 'undo', 'all', 'to name-of-migration.js', 'seed', 'seedall', 'seedundo', 'seedundoall'
```

### Argument: create
```bash
node run.js create
```
The `create` argument wraps `sequelize` command: `npx sequelize-cli model:generate --name` and creates new models. 

The script reads the content of the file `src/db/schemas/schema.json`. 

### Argument: up
```bash
node run.js up
```
Wraps `sequelize` command: `npx sequelize-cli db:migrate`

### Argument: undo
```bash
node run.js undo
```
Wraps `sequelize` command: `npx sequelize-cli db:migrate:undo`

### Argument: all
```bash
node run.js all
```
Wraps `sequelize` command: `npx sequelize-cli db:migrate:undo:all`

### Argument: to
```bash
node run.js to <migration>
```
Wraps `sequelize` command: `npx sequelize-cli db:migrate:undo:all --to <migration>`

### Argument: seed
```bash
node run.js seed <seedname>
```
Wraps `sequelize` command: `npx sequelize-cli seed:generate --name <seed>`

### Argument: seedall
```bash
node run.js seedall
```
Wraps `sequelize` command: `npx sequelize-cli db:seed:all`

### Argument: seedundo
```bash
node run.js seedundo
```
Wraps `sequelize` command: `npx sequelize-cli db:seed:undo`

### Argument: seedundoall
```bash
node run.js seedundoall
```
Wraps `sequelize` command: `npx sequelize-cli db:seed:undo:all`


## Build
Next step is to run a test build.

```
npm run build
```

## Start application
To see the example in action, start the web server.

```
npm start
```

## Open in browser
Check the result in your browser.

```
http://localhost:3000
```

## Running build and run with a single command
To run the build and run process at once, you can run this command:

```
npm run all
```

