const pool = require('../config/db')

const addMessage = ({id, body , sender_id, receiver_id}) => {
    return pool.query('INSERT INTO messages (id, body, sender_id, receiver_id) values ($1, $2, $3, $4)', [id, body, sender_id, receiver_id])
}
const getMessage = ({sender_id, receiver_id}) => {
  return pool.query(`SELECT id, body, sender_id, receiver_id , extract(epoch from post_at) as time FROM messages where (sender_id = '${sender_id}' AND receiver_id = '${receiver_id}') OR (sender_id = '${receiver_id}' AND receiver_id = '${sender_id}') ORDER BY post_at ASC`)
}
const updateMessage = ({id, body}) => {
  return pool.query('UPDATE messages SET body = $1 WHERE id = $2', [body, id])
}
const deleteMessage = (id) => {
  return pool.query('DELETE FROM messages WHERE id = $1', [id])
}
const getLastMessage = (id) => {
  return pool.query(`select body, sender_id, receiver_id , extract(epoch from post_at) as time from messages where sender_id = '${id}' or receiver_id = '${id}' order by post_at desc limit 1`)
}

module.exports = {
    addMessage, getMessage, updateMessage, deleteMessage, getLastMessage
}