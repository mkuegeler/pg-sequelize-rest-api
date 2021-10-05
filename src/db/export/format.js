// Remove white spaces from text
const text = `[
    {
        "name": "style",
        "id": "css1"
    },
    {
        "name": "style",
        "id": "css2"
    },
    {
        "name": "style",
        "id": "canvas"
    },
    {
        "name": "style",
        "id": "grid"
    },
    {
        "name": "style",
        "id": "panel"
    },
    {
        "name": "defs",
        "id": "node"
    },
    {
        "name": "canvas",
        "id": "SimpleCanvas"
    }]`;





const newStr = text.split(/\s/).join('');
console.log(newStr);
