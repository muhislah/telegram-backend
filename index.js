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
        origin : 'http://localhost:3000'
    }
})
app.use(express.json())
app.use(cors({
    origin : 'http://localhost:3000'
}))
app.use('/auth', userRouter)
app.use('/message', messageRouter)
app.use('/profile', profilRouter)

io.on("connection", socket => {
    console.log("device connect with id = "+socket.id);
    socket.on('sendMessage', (data) => {
        console.log(data)
        io.emit('incoming', data)
    })
    socket.on('disconnect', () => {
        console.log("device disconnect");
    })
})

app.use((req, res) => {
    response(res, [], 200, "page not found")
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
    console.log("Server Running on Port "+PORT);
})