const passwd = require('bcrypt')
const { v4: uuid } = require('uuid')
const response = require('../helper/response')
const { searchUser, registerUser } = require('../model/userModel')
const createError = require('http-errors')
const { generateAccessToken, generateRefreshToken } = require('../helper/jwt')

module.exports.registerUser = async (req, res, next) => {
    const {
        fullname,
        email,
        password
    } = req.body
    try {
        const user = {}
        user.id = uuid()
        user.fullname = fullname
        user.email = email
        user.password = await passwd.hash(password, 10)
        const { rowCount } = await searchUser(email)
        if (rowCount) {
            return response(res, [], 500, 'USER HAS BEEN REGISTERED')
        }
        const { rowCount: register } = await registerUser(user)
        if (!register) {
            return response(res, [], 300, 'REGISTER FAILED')
        }
        response(res, [], 200, "REGISTER SUCCESS")
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}

module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const { rows: [rows], rowCount } = await searchUser(email)
        if (!rowCount) {
            return response(res, [], 200, 'USER NOT REGISTERED')
        }
        const id_user = rows.id
        const hashedPasswd = rows.password
        const isMatch = await passwd.compare(password, hashedPasswd)
        if (!isMatch) {
            return response(res, [], 200, 'USERNAME OR PASSWORD WRONG')
        }
        const data = {
            email,
            token: await generateAccessToken(email, id_user),
            refreshToken: await generateRefreshToken(email, id_user)
        }
        response(res, data, 200, 'LOGIN SUCCESS')
    } catch (error) {
        console.log(error)
        next(createError.InternalServerError())
    }
}