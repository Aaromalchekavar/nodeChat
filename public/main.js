const socket = io.connect('https://c6b4-103-70-197-94.ngrok.io/')

const msg = document.getElementById('message')
const hndle = document.getElementById('handle')
const btn = document.getElementById('send')
const otpt = document.getElementById('output')
const typingAlert = document.getElementById('typingAlert')

btn.addEventListener("click",()=>{
    socket.emit("chat",{
        message: msg.value,
        handle: hndle.value,
    })
})

message.addEventListener("keypress",()=>{
    socket.emit("typing",hndle.value)
})


//listening to server
socket.on('chat',(data)=>{
    typingAlert.innerHTML = ""
    output.innerHTML += '<p><strong>'+data.handle+':</strong>'+data.message+'</p>'
})
socket.on("typing",(data)=>{
    typingAlert.innerHTML = data+' is typing...'
})