const response = require("../helper/response")
const { getLastMessage } = require("../model/messageModel")
const { getAllUser, getProfile, updateProfile } = require("../model/profileModel")
const { searchUser } = require("../model/userModel")


module.exports.getProfile = async (req, res, next) => {
    try {
        const { id, email } = req.payload
        const { rows: [data] } = await searchUser(email)
        if (!data) {
            return response(res, [], 200, "get profile failed")
        }
        delete data.password
        response(res, data, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}
module.exports.getAllUser = async (req, res, next) => {
    const search = req.query.search || null
    try {
        const { id: sender_id } = req.payload
        const { rows } = await getAllUser()
        const filtered = rows.filter((data) => data.id !== sender_id)
        const detailPerUser = filtered.map(async (data) => {
            const { rows: [last] } = await getLastMessage(data.id , sender_id)
            if(last){
                data.lastMessage = last.body
                data.lastTime = last.time 
            }else{
                data.lastMessage = "Say Hai !!!"
                data.lastTime = '1658822941'
            }
            return data
        })
        const result = await Promise.all(detailPerUser)
        const newData = result.map((data) => {
            const date = new Date(data.lastTime * 1000)
            const hours = date.getHours()
            const minutes = date.getMinutes()
            data.lastTime = hours+':'+minutes
            return data
          })
        if(search){
            const veryNewData = newData.filter(data => data.fullname.toLowerCase().includes(search.toLowerCase()))
            return response(res, veryNewData, 200, "get profile success")
        }
        response(res, newData, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}

module.exports.getProfilebyId = async (req, res, next) => {
    try {
        const id = req.params.id
        const { rows: [data] } = await getProfile({ id })
        if (!data) {
            return response(res, [], 200, "get profile failed")
        }
        delete data.password
        response(res, data, 200, "get profile success")
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateProfile = async (req,res,next) => {
    try {
        const data = {
            id : req.payload.id,
            fullname :  req.body.fullname || null,
            bio : req.body.bio || null,
            photo : req.file?.path || null,
            email : req.body.email || null,
            phone : req.body.phone || null
        }
        const { rowCount } = await updateProfile(data)
        if(!rowCount) {
            return response(res, null, 300, 'update failed')
        }
        response(res, data, 200, 'update success')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}