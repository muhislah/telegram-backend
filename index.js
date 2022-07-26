require('dotenv').config()
const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('http')
const userRouter = require('./src/route/userRoute')
const cors = require('cors')
const messageRouter = require('./src/route/messageRouter')
const profilRouter = require('./src/route/profileRouter')
const response = require('./src/helper/response')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors : {
        origin : ['http://localhost:3000','https://telegram-xi.vercel.app']
    }
})
app.use(express.json())
app.use(cors({
    origin : ['http://localhost:3000','https://telegram-xi.vercel.app']
}))

app.use('/auth', userRouter)
app.use('/message', messageRouter)
app.use('/profile', profilRouter)

const users = {}
io.on("connection", socket => {
    console.log("device connect with id = "+socket.id);
    socket.on('sendMessage', (data) => {
        console.log(data)
        io.emit('incoming', data)
    })
    socket.on('present', (data) => {
        users[socket.id] = data
        console.log(users)
        io.emit('online', users)
    })
    socket.on('disconnect', () => {
        io.emit('online', users)
        console.log("device disconnect");
        delete users[socket.id]
        console.log(users)
    })
},[])

app.use((req, res) => {
    return response(res, [], 300, 'PAGE NOT FOUND')
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
    console.log("Server Running on Port "+PORT);
})