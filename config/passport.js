const bcrypt = require('bcryptjs')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const db = require('../models')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('login', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false
    },
    (username, password, done) => {
        try {
            db.User.findOne({
                where: {
                    username,
                }
            }).then(user => {
                if (!user) {
                    console.log('Username is invalid.')
                    return done(null, false, { message: 'Invalid username.' })
                } else {
                    bcrypt.compare(password, user.password).then(response => {
                        if (!response) {
                            console.log('Password is invalid.')
                            return done(null, false, { message: 'Password is invalid.' })
                        }
                        console.log('Account found and authenticated.')
                        return done(null, user)
                    })
                }
            })
        } catch(e) {
            console.log(e)
            done(e)
        }
    }
))

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.SECRET
}

passport.use('jwt', new JWTstrategy(opts, (jwt_payload, done) => {
    try {
        db.User.findOne({
            where: {
                username: jwt_payload.id
            }
        }).then(user => {
            if (user) {
                console.log('User Found!')
                done(null, user)
            } else {
                console.log('User Not Found.')
                done(null, false)
            }
        })
    } catch (e) {
        console.log(e)
        done(e)
    }
}))