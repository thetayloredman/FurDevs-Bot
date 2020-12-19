require("./strategies/discord")
const express = require("express");
const passport = require("passport")
const mongoose = require("mongoose")
const session = require("express-session")
const Store = require("connect-mongo")(session)
const cors = require("cors")
const app = express()
const domain = process.env.DOMAIN
const port = process.env.PORT
const routes = require("./routes")


module.exports = async (client) => {

    mongoose.connect(`${process.env.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    app.use(cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    }))
    app.use(session({
        secret: process.env.CLIENTSECRET,
        cookie: {
            maxAge: 60000 * 60 * 24
        },
        resave: false,
        saveUninitialized: false,
        store: new Store({
            mongooseConnection: mongoose.connection
        })
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use("/api", routes)
    app.listen(port, () => {
        console.log(`${client.fwebsLog} Dashboard is Ready to Serve on http://${domain}:${port} !`)
    })
}