const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs');
var slugify = require('slugify')

const replaceDynamic = require('./modules/replaceDynamic')

const hostname = '127.0.0.1';
const port = 3000;

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8')
const tempOverview = fs.readFileSync('./starter/templates/overview.html', 'utf-8')
const tempProducts = fs.readFileSync('./starter/templates/product.html', 'utf-8')
const tempCards = fs.readFileSync('./starter/templates/cards.html', 'utf-8')
const dataObj = JSON.parse(data)
const slugs = dataObj.map(el => slugify(el.productName,{lower : true}));
console.log(slugs)
 

const server = http.createServer((req, res) => {
 
  const {query,pathname} = url.parse(req.url,true) 

  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' })

    const cardshtml = dataObj.map(ele => replaceDynamic(tempCards,ele)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml)

    res.end(output)
  } else if(pathname === '/product'){
    res.writeHead(200, { 'Content-Type': 'text/html' })
    const product = dataObj[query.id]
    const output  = replaceDynamic(tempProducts,product)

    res.end(output)
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