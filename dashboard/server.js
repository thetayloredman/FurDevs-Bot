const express = require('express');
const app = express()
const port = process.env.PORT || 3000
const domain = process.env.DOMAIN || "localhost"

const dashboard = (client) => {

        app.set('views', __dirname + '/views')
        app.set('view engine', 'ejs')

        app.get('/', (req, res) => {
        res.status(200).render("index")
    })

    app.listen(1337, () => {
        console.log(`${client.fwebsLog} Listening on port http://${domain}:${port}`)
    })
}

module.exports = dashboard