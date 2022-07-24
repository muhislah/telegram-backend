const pool = require('../config/db')

const registerUser = ({id, fullname, email, password, photo}) => {
    console.log('registering user...')
    return pool.query(`INSERT INTO users (id, fullname, email, password, photo) values ('${id}','${fullname}', '${email}', '${password}', '${photo}')`)
}

const searchUser = (email) => {
    return pool.query(`SELECT * FROM users WHERE email = '${email}'`)
}

module.exports = {
    registerUser,
    searchUser
}