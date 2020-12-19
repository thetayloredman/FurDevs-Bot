const domain = process.env.DOMAIN
const port = process.env.PORT

const express = require('express')
const app = express()

const dashboard = (client) => {   
    app.get('/', (req, res) => {
        res.status(200).send("Hello World!")
    })

    app.listen(port, () => {
        console.log(`${client.fwebsLog} Listening on http://${domain}:${port}`)
    })
}

module.exports = dashboard