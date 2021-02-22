// API written in express by charmines#1522
const settings = require("./settings.json")
const bodyParser = require("body-parser");
const express = require('express')
let app = express()

// Listen on port in settings
app.listen(settings.APIPort, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Ready at port ' + settings.APIPort)
    }
})

// Handle requests
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.urlencoded()) // Decode URLs

// Handle API Requests
app.post('/xp', (req, res) => {
  let target = await client.guilds.cache.get('731520035717251142').members.cache.get(req.param('userid'))
  const profile = await target.settings()
  res.json({
    "user": target.nickname,
    "xp": profile.XP
  })
})
