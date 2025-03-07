import express from 'express';
import { Server } from 'socket.io';
import connection from './DB/connection.js';
import Post from './DB/models/post.model.js';
const app = express();
const port = 3000
connection()
app.get('/', (req, res) => res.send('hello world'))
let server=app.listen(port, ()=> console.log(`listening on port ${port}`))

const io = new Server(server,{
    cors:'*'
});

io.on("connection",(socket)=>{
    console.log('hello');


    socket.on("addPost",async (data)=>{
        console.log(data);
       await Post.insertMany(data)
       let posts = await Post.find()
       io.emit("posts",posts);
    })
    socket.on("load",async()=>{
        let posts = await Post.find()
        io.emit("posts",posts);
    })

    socket.on("Delete",async(id)=>{
        await Post.findByIdAndDelete(id)
        let posts = await Post.find()
        io.emit("posts",posts);
    })
    
    socket.on("search", async (searchQuery)=>{
        let posts = await Post.find({title: {$regex: searchQuery}})
        io.emit("posts",posts);
    })
})

// io.on("connection",(socket)=>{
//     console.log(socket.id);
//     console.log("socket works");
//     socket.on("chatMessage",(msg)=>{
//         // io.emit("chatMessage",msg);
//         console.log(msg,"from server");
//         socket.broadcast.emit('reply',msg);
//     })
//     socket.on("disconnect",()=>{
//         console.log("user disconnected");
//     })
    
//     socket.on("Typing",()=>{
//         socket.broadcast.emit("userTyping")
//     })

//     socket.on("stopTyping",()=>{
//         socket.broadcast.emit("userStopTyping")
//     })
// })