const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');

const hostname = '127.0.0.1';
const port = 3000;


const replaceDynamic = (temp,product) =>{
  let output = temp.replace(/{%PRODUCT_NAME%}/g,product.productName);
  output = output.replace(/{%IMAGE%}/g,product.image);
  output = output.replace(/{%QUANTITY%}/g,product.quantity);
  output = output.replace(/{%PRICE%}/g,product.price);
  output = output.replace(/{%DESCRIPTION%}/g,product.description);
  output = output.replace(/{%NUTRIENTS%}/g,product.nutrients);
  output = output.replace(/{%FROM%}/g,product.from);
  output = output.replace(/{%ID%}/g,product.id);


  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic');
  return output
}

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8')
const tempOverview = fs.readFileSync('./starter/templates/overview.html', 'utf-8')
const tempProducts = fs.readFileSync('./starter/templates/product.html', 'utf-8')
const tempCards = fs.readFileSync('./starter/templates/cards.html', 'utf-8')
const dataObj = JSON.parse(data)
 

const server = http.createServer((req, res) => {
  const pathname = req.url
  

  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardshtml = dataObj.map(ele => replaceDynamic(tempCards,ele)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml)

    res.end(output)
  } else if(pathname === '/products'){
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(tempProducts)
  }else if (pathname === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(dataObj)
  } else {
    res.writeHead(404);
    res.end('no page found');
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});