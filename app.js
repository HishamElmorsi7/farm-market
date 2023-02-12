// REQUIRING MODULES
const fs = require('fs')
const url = require('url')
const http = require('http')
const replaceTemplate = require('./hisham-modules/replace-template')


// READING FILES
const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const template_overview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const template_card = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const template_product = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')

// PARSING JSON DATA
const dataObjs = JSON.parse(jsonData)


let cards = dataObjs.map(ele => replaceTemplate(template_card, ele))
cards = cards.join('')


const overview = template_overview.replace(/#cards#/g, cards)

// ROUTING
server = http.createServer((req, res) => {
    console.log(url.parse(req.url))
    path = req.url

    if (path === '/overview' || path === '/') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        })
        res.end(overview)

    } else if (path.startsWith('/product')) {
        parsed_path = path.split('/')
        id = parsed_path[2]
        if (dataObjs[id]) {

            product = dataObjs[id]
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })

            rendered_result = replaceTemplate(template_product, product)
            console.log(rendered_result)
            res.end(rendered_result)

        } else {
            res.end(`INVALID ID ${id}`)
        }




    } else if (path === '/api') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })

    } else {
        console.log('hi')
        res.writeHead(400, {
            'Content-type': 'text/html',
            'IamMeta': 'Hisham'
        })
        res.end('NotFound')
    }
})

// LISTENING FOR REQUESTS
server.listen(4000, () => {
    console.log('I am now listening for your requests...')
})




