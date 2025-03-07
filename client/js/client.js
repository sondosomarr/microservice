const socket = io("http://localhost:3000/");
socket.on("connect",()=>{
 socket.emit("load")
})

const title = document.getElementById("title")
const desc = document.getElementById("desc")
const searchInput = document.getElementById("search")

function addPost(){
    const post ={
        title: title.value,
        description: desc.value
    }
    socket.emit("addPost", post);
}

socket.on("posts",(data)=>{
  display(data);
})
function display(data){
    let filteredData = data
    if(searchInput.value){
        filteredData = data.filter(post=>post.title.toLowerCase().includes(searchInput.value.toLowerCase()))
    }
    let box = ``;
    for (let index = 0; index < data.length; index++) {
        box+=`<div class="col-md-4 my-2">
              <div class="bg-white shadow p-4 text-center text-black">
                     <h2>${data[index].title}</h2>
                  <p>${data[index].description}</p>
                  <button onclick="deletePost('${data[index]._id}')" class="btn btn-danger">Delete</button>
                  </div>
               </div>`
    }
    document.getElementById("data").innerHTML = box;
}

function deletePost(id){
socket.emit("Delete",id)
}

if(searchInput){
    searchInput.addEventListener("input",()=>{
        socket.emit('search',searchInput.value)
    })
}
// const chatInput = document.getElementById("message");
// const msgContainer = document.getElementById("msgContainer");
// function sendMessage() {
//   const message = chatInput.value;
//   console.log(message);
//   socket.emit("chatMessage", message);
//   chatInput.value = "";
// }

// socket.on("reply", (valu) => {
//   console.log(valu);
//   const item = document.createElement("li");
//   item.textContent = valu;
//   msgContainer.append(item);
//   window.scrollTo(0,document.body.scrollHeight)
// });

// chatInput.addEventListener("input",()=>{
//     socket.emit("Typing")
// })

// socket.on("userTyping",()=>{
//     document.getElementById("typeMsg").innerHTML="typing..."
// })

// chatInput.addEventListener("keyup",()=>{
//     socket.emit("stopTyping")
// })

// socket.on("userStopTyping",()=>{
//     setTimeout(()=>{
//     document.getElementById("typeMsg").innerHTML=""
//     },1000)
// })