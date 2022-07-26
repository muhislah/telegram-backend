const pool = require('../config/db')

const getProfile = ({id}) => {
    return pool.query('SELECT * FROM users WHERE id=$1', [id])
}
const getAllUser = () => {
    return pool.query('SELECT fullname, email, id, photo, bio, phone FROM users')
}

const updateProfile = ({fullname, bio, email, photo, phone, id}) => {
    return pool.query("UPDATE users SET fullname = COALESCE($1, fullname), bio = COALESCE($2, bio), email = COALESCE($3, email), photo = COALESCE($4, photo), phone = COALESCE($5, phone) WHERE id = $6",[fullname, bio, email, photo, phone, id])
}

module.exports = {
    getProfile, getAllUser, updateProfile
}