const response = require("../helper/response")
const { addMessage, getMessage, updateMessage, deleteMessage } = require("../model/messageModel")
const { v4: uuid } = require('uuid')

module.exports.addMessage = async (req, res, next) => {
    try {
        const payload = req.payload
        const {id , type} = payload 
        if (type != "access-token"){
           return response(res, [] ,200 , "TOKEN WRONG")
        }
        const { body , receiver_id , id : uuid } = req.body
        const data = {}
        data.id = uuid
        data.body = body
        data.sender_id = id
        data.receiver_id = receiver_id
        const { rowCount } = await addMessage(data)
        if(!rowCount) {
          return response(res, [] , 200, 'failed add message')
        }
        response(res, data , 200, 'success add message')
    } catch (error) {
        console.log(error)
    }
}

module.exports.getMessage = async (req,res, next) => {
  try {
    const receiver_id = req.params.receiver_id
    const {id : sender_id} = req.payload
    const { rows } = await getMessage({sender_id, receiver_id})
    if (!rows) {
      return response(res, [], 500, 'get data failed')
    }
    const newData = rows.map((data) => {
      const date = new Date(data.time * 1000)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      data.time = hours+':'+minutes
      return data
    })
    response(res, newData, 200, 'get data success')
  } catch (error) {
    console.log(error)
  }
}

module.exports.updateMessage = async (req ,res, next) => {
  try {
    const id = req.params.id
    const {body} = req.body
    const { rowCount } = await updateMessage({id, body})
    if (!rowCount) {
      return response(res, [], 200, 'update failed')
    }
    return response(res, [] , 200, 'update success')
  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteMessage = async (req,res, next) => {
  try {
    const id = req.params.id
    const { rowCount } = await deleteMessage(id)
    if (!rowCount) {
      return response(res, [], 200, 'delete failed')
    }
    return response(res, [] , 200, 'delete success')
  } catch (error) {
    console.log(error)
  }
}
