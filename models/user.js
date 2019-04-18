const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 30],
                validateUsername: function (username) {
                    try {
                        if (/^[a-zA-Z0-9]+$/.test(username)) {
                            console.log("Valid Username")
                            return username
                        } else {
                            throw new Error(`${username} is an invalid entry. The username must contain at least one uppercase letter, one lowercase letter, and one number.`)
                        }
                    } catch (e) {
                        console.log(e)
                        return e.message
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                min: 7,
                validatePassword: function (password) {
                    try {
                        if (/^[a-zA-Z0-9]+$/.test(password)) {
                            console.log("Valid Password")
                            return password
                        } else {
                            throw new Error("Invalid password. The password must contain at least one uppercase letter, one lowercase letter, and one number.")
                        }
                    } catch (e) {
                        console.log(e)
                        return e.message
                    }
                }
            }
        }
    })

    User.prototype.validPassword = async password => {
        return await bcrypt.compareSync(password, this.password)
    }

    User.beforeCreate(async user => {
        return user.password = await bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    })

    // User.associate = models => {
    //     User.hasOne(models.Employee, {
    //         foreignKey: 'id'
    //     })
    // }

    return User
}