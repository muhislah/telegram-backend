const jwt = require('jsonwebtoken')

const generateAccessToken =  async (email, id) => {
    const payload = {
        email,
        id,
        type : 'access-token'
    }
    const options = {
        algorithm : 'HS256',
        expiresIn : '1d'
    }
    const result = await jwt.sign(payload ,process.env.SECRET_KEY ,options)
    return result
}

const generateRefreshToken = async (email, id) => {
    const payload = {
        email,
        id,
        type : 'refresh-token'
    }
    const options = {
        algorithm : 'HS256',
        expiresIn : '1d'
    }
    const result = await jwt.sign(payload,process.env.SECRET_KEY,options)
    return result
}

const verifyJWT = async (token) => {
    const result = await jwt.verify(token, process.env.SECRET_KEY)
    return result
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyJWT
}