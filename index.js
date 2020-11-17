const fs = require('fs');     // fileSystem
const http = require('http'); // gives us networking capability
const url = require('url');   // 


// BLOCKING / SYNCHRONOUS CODE

/*
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

/*
readFileSync: 
  first argument: path to the file to be read
  2nd argument: always type 'utf-8
*/

/*
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

fs.writeFileSync('./txt/output.txt', textOut);
/*
wrtieFileSync: writes data to an external file
  1st argument: the path to the file to be written to (will create if file does not already exist)
  2nd argument: what to write (in this case, the variable with the text we want to write)
*/

/*
console.log('File written!');

// NON-BLOCKING / ASYNCHRONOUS CODE
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('Could not read file...');

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('Your file has been written...');
      });
    });
  });
});
console.log('Will read file...');

*/
// ================================================================

// SERVER CREATION
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }
  return output;
};

/*
  / /g - this is the global flag. this is needed above because otherwise the function would only
  replace the first instance of {%PRODUCTNAME%} instead of all instances.
*/

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

  // SET ROUTING
  const pathName = req.url; // save the url into a variable that we can check below

  // OVERVIEW PAGE
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {'Content-type': 'text/html'});

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

    res.end(output); // simplest way to send back a response (res.output)

  // PRODUCT PAGE
  } else if (pathName === '/product') {
    res.end('This is the PRODUCT');

  // API
  } else if (pathName === '/api') {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(data);

  // NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h1>page is not found...</h1>');
  }
});

// LISTEN TO THE SERVER
server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});