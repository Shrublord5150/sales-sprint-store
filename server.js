require('dotenv').config({ debug: process.env.debug })
require('./config/passport')
const routes = require('./routes')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./models')
const passport = require('passport')
const cors = require('cors')


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize())

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

let syncOptions = { force: false }

if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true
}

app.use(routes)


db.sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(`🌎 Listening on Port ${PORT}`)
  })
})

//ds was here
// So was the Shrublord
// heres another comment
