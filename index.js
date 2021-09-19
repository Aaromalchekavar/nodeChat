const express = require('express')
const app = express()
const socket = require('socket.io')
const port = process.env.PORT || 4000 
const ejs = require('ejs')
const {auth,requiresAuth} = require('express-openid-connect')
const server = app.listen(port,()=>{
    console.log(`app is listening at http://localhost:${port}`)
})

const baseurl = `http://chatinger.herokuapp.com/`
app.use(express.static('public'))
//open id connect
app.use(
    auth({
      authRequired: false,
      auth0Logout:true,
      issuerBaseURL: 'https://dev-armlckvr.us.auth0.com',
      baseURL: baseurl,
      clientID: '1maEsft5QZOBuF1DkNpmEaAW6QpvhE9z',
      secret: 'dkjadfbjdabdsabdhfhjgdytvcQEWHCKIHYWQU3VEYUTWQVXEGTVYCEYUAYEIUVGCXYWTCYURWGXDGIUYEWIUYT',
      idpLogout: true,
    })
  );

let io = socket(server)

app.set("view engine", "ejs")

app.get('/',(req,res)=>{
    res.send(req.oidc.isAuthenticated() ? 'logged in' : 'logged Out')
})
app.get('/chat',requiresAuth(),(req,res)=>{
    res.render('index')
})

io.on("connection",(socket)=>{
    console.log(`connection made`)

    socket.on("chat",(data)=>{
        console.log(data)
        io.sockets.emit('chat',data)
    })

    socket.on("typing",(data)=>{
        console.log(`${data} is typing`)
        socket.broadcast.emit("typing",data)
    })
})

