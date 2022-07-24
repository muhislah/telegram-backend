const response = require("../helper/response")
const { getAllUser, getProfile } = require("../model/profileModel")
const { searchUser } = require("../model/userModel")


module.exports.getProfile = async (req, res, next) => {
    try {
        const {id, email} = req.payload
        const { rows : [data]} = await searchUser(email)
        if (!data) {
            return response(res, [], 200, "get profile failed")
        }
        delete data.password
        response(res, data, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}
module.exports.getAllUser = async (req,res,next) => {
    try {
        const { id : sender_id } = req.payload
        const {rows } = await getAllUser()
        const filtered = rows.filter((data) => data.id !== sender_id )
        response(res, filtered, 200, "get profile success")
    } catch (error) {
       console.log(error) 
    }
}

module.exports.getProfilebyId = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rows : [data] } = await getProfile({ id })
        if (!data) {
            return response(res, [], 200, "get profile failed")
        }
        delete data.password
        response(res, data, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}