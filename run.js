// Project run script
const { exec } = require("child_process");
const path = require('path');
const fs = require('fs');
const setup = require("./setup.json");
const csvToJson = require('convert-csv-to-json');

// Get arguments from command line
let initArgs = process.argv.slice(2);

switch (initArgs[0]) {
    case 'create': // Create models. See  src/db/schemas/schema.json
        let file = "";
        initArgs[1] ? file = initArgs[1] : file = setup.default_schema;
        createModels(file);
        break;
    case 'up': // Create tables from models in database
        migrations_up();
        break;
    case 'undo': // Revert most recent migration
        migrations_undo();
        break;
    case 'all':  // Revert back to initial state
        migrations_all();
        break;
    case 'to': // Revert back to a specific migration
        migrations_to(initArgs[1]);
        break;
    case 'seed': // This command will create a seed file in seeders
        let model = "model";
        if (initArgs[1]) { model = initArgs[1]; }
        seed(model);
        break;
    case 'seedall': // Committ seed to database.
        seed_all();
        break;
    case 'seedundo': // Revert most recent seed
        seed_undo();
        break;
    case 'seedundoall':  // Revert back all seeds
        seed_undoall();
        break;
    case 'cleanup':  // Reset all migrations
        cleanup();
        break;
    case 'csv2json':
        if (initArgs[1]) {
            csv2json(`${setup.db_path}/export/${initArgs[1]}`);
        }
        else { console.log("No csv!") }
        break;
    default:
        help();
}

// Argument functions
function help() {
    console.log(`
    Run this script with one of these arguments: \n
    'create', 'up', 'undo', 'all', 'to name-of-migration.js', 'seed', 'seedall', 'seedundo', 'seedundoall'\n
    A typical worklow is: 1. create, 2. up, 3. seedall. 
    `);
}

function migrations_up() {
    execute("npx sequelize-cli db:migrate");
}

function migrations_undo() {
    execute("npx sequelize-cli db:migrate:undo");
}

function migrations_all() {
    execute("npx sequelize-cli db:migrate:undo:all");
}

function migrations_to(to) {
    execute(`npx sequelize-cli db:migrate:undo:all --to ${to}`);
}

function seed(model) {
    let prefix = 'demo';
    execute(`npx sequelize-cli seed:generate --name ${prefix}-${model}`);
}

function seed_all() {
    execute(`npx sequelize-cli db:seed:all`);
}

function seed_undo() {
    execute(`npx sequelize-cli db:seed:undo`);
}

function seed_undoall() {
    execute(`npx sequelize-cli db:seed:undo:all`);
}

function cleanup() {
    execute(`rm src/db/migrations/*.js`);
}

function createModelCommand(model, force = false) {

    let result = "npx sequelize-cli model:generate --name ";

    for (const [key, value] of Object.entries(model)) {

        if (key === "name") { result += `${value} --attributes `; }
        if (key === "attributes") {

            for (const [attr_key, attr_value] of Object.entries(value)) {
                result += `${attr_key}:${attr_value},`
            }
        }
    }
    // Remove last comma and check if force (overwriting existing models) is true
    result = force === true ? `${result.replace(/,\s*$/, "")} --force` : result.replace(/,\s*$/, "");
    return result;


}

function createModels(schemaFile) {

    let location = path.resolve(setup.db_path, setup.schema_dir);

    fs.readFile(`${location}/${schemaFile}.json`, (err, data) => {
        if (err) throw err;
        let schema = JSON.parse(data);
        schema.forEach(model => {
            execute(createModelCommand(model, setup.overwrite));
        });
    });

}

function execute(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

// Support function for checkforJsoninCsv
function getElementIndexbyString(s, e) {
    return { start: ((element) => element.charAt(0) === s), end: ((element) => element.charAt(element.length - 1) === e) };
}

// Build valid json from string (used in checkforJsoninCsv)
function buildJsonRow(arr, s, e) {

    let row = new Array();
    let selection = getElementIndexbyString(s, e);

    let start = arr[arr.findIndex(selection.start)];
    let end = arr[arr.findIndex(selection.end)];

    row.push(start);

    if (start != end) {
        let index = 0;
        arr.forEach(element => {
            if (index > arr.findIndex(selection.start) && index < arr.findIndex(selection.end)) {
                row.push(element);
            }
            index++;
        });
        row.push(end);
        row = row.join(',');
    }
    else {
        row = (row.length <= 1 && row[0] == null) ? `${s}${e}` : row.join('');
    }

    return row;

}

// Multiple string replacements (used in checkforJsoninCsv)
function replaceMultipleStrings(element, tpl) {
    let el = "";
    let index = 0;
    tpl.forEach(t => {
        el = index === 0 ? element.replace(new RegExp(t.s, 'g'), t.r) : el.replace(new RegExp(t.s, 'g'), t.r);
        index++;
    })

    return el;
}

// Joins two items in an array into one single json string (used in csv2json)
function checkforJsoninCsv(line) {

    let rawArr = Array.from(line.split(','));
    let arr = new Array();
    rawArr.forEach(element => {
        let el = element == '' ? '""' : element;
        arr.push(el);
    });

    let tpl = [
        { s: '""', r: '"' },
        { s: '"\\[', r: '[' },
        { s: '}"', r: '}' },
        { s: '"{', r: '{' },
        { s: '\\]"', r: ']' }
    ];
    let convertedLineArr = [];

    arr.filter(el => el.charAt(0) === '"' || el.charAt(el.length - 1) === '"').forEach(element => {
        if (arr.find(item => item === element)) { arr.splice([arr.indexOf(element)], 1); }
        convertedLineArr.push(replaceMultipleStrings(element, tpl));
    });

    return [...arr,
    buildJsonRow(convertedLineArr, '{', '}').length === 0 ? "{}" : buildJsonRow(convertedLineArr, '{', '}'),
    buildJsonRow(convertedLineArr, '[', ']').length === 0 ? "[]" : buildJsonRow(convertedLineArr, '[', ']')
    ];
}

// converts a csv file into a json file
function csv2json(file) {

    let rawJson = csvToJson.getJsonFromCsv(`${file}.csv`);
    let convertedJson = new Array();

    rawJson.forEach(json => {

        Object.entries(json).forEach(([key, value]) => {

            let left = Array.from(key.split(','));
            let right = checkforJsoninCsv(value);

            let obj = new Object();

            for (let i = 0; i < left.length; i++) {
                let checkedValue = (right[i].charAt(0) === '{' || right[i].charAt(0) === '[') ? JSON.parse(right[i]) : right[i];
                obj[left[i]] = checkedValue;
            }
            convertedJson.push(obj);

        });
    });

    fs.writeFile(`${file}.json`, JSON.stringify(convertedJson), err => {
        if (err) {
            console.error(err);
            return
        } else {
            console.log(`File '${file}.json' written sucessfully`);
        }
    })
}