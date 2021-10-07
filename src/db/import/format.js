// Remove white spaces from text
const text = `{
    "stroke-width": 1,
    "stroke": "#ffcc99",
    "fill": "none"
}`;


const newStr = text.split(/\s/).join('');
console.log(newStr);
