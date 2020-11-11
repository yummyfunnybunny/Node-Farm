const fs = require('fs'); // fileSystem

const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
/*
readFileSync: 
  first argument: path to the file to be read
  2nd argument: always type 'utf-8
*/
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);
/*
wrtieFileSync: writes data to an external file
  1st argument: the path to the file to be written to (will create if file does not already exist)
  2nd argument: what to write (in this case, the variable with the text we want to write)
*/
console.log('File written!');