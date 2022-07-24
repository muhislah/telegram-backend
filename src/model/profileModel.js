const pool = require('../config/db')

const getProfile = ({id}) => {
    return pool.query('SELECT * FROM users WHERE id=$1', [id])
}
const getAllUser = () => {
    return pool.query('SELECT fullname, email, id, photo FROM users')
}

module.exports = {
    getProfile, getAllUser
}