const db = require("../models");
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async function (req, res) {
    console.log("register hit")
    try {
      const { username, email, password } = req.body
      let data = await db.User.findOne({
        where: {
          username,
          email
        }
      })
      if(!data) {
        let user = await new db.User({
          username,
          email,
          password
        })
        await user.save()
        console.log("User Created!")
        res.json(user)
      } else {
        throw new Error('A user with that username already exists.')
      }

    } catch(e) {
      console.log(e)
      res.status(422).json(e.message)
    } 
  },
  login: async function(req, res, next) {
    passport.authenticate('login', (err, user, info) => {
      if (err) {
        console.log(err)
      }
      if (info !== undefined) {
        console.log(info.message)
        res.json(info.message)
      } else {
        req.logIn(user, err => {
          db.User.findOne({
            where: {
              username: user.username
            }
          }).then(user => {
            const token = jwt.sign({ id: user.username }, process.env.SECRET)
            res.status(200).send({
              authenticated: true,
              token: token,
              message: 'The requested account has been found and logged in.'
            })
          })
        })
      }
    }) (req, res, next)
  },
  storeUserInformation: async function (req, res) {
    try {
      const { first_name, last_name, birthday, email, allergens } = req.body
      let userInfo = await new db.Employee({ first_name, last_name, birthday, email, allergens })
      userInfo.save()
      res.json(userInfo)
    } catch(e) {
        console.log(e)
        res.status(422).json(e)
    }
  } 
}