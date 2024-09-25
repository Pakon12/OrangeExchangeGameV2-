var Client = {};
Client.socket = io();  
let datas = {}
let lengthPlayers;
let objects = {};
let objected = {};
let sender =null;
let isWIN = false

const orangesId = ['orangeA', 'orangeB', 'orangeC', 'orangeD', 'orangeE', 'orangeF'];

Client.socket.on("profile", (data) => {
    datas = data;
})

Client.socket.on("length", (data) => {
    lengthPlayers = data;
})

const emitData = (data, type) => {
    if (type === "left") {
        Client.socket.emit("sendOrange", {data:data,sendTo: datas.number - 1,from: datas.number});
    } else if (type === "right") {
        Client.socket.emit("sendOrange", {data:data,sendTo: datas.number + 1,from: datas.number});
    }
    
}

Client.socket.on("receiveOrange", ({data,from}) => {
    objects = {...data};
    sender = from;
})

function emitReceiveOrange() {
    Client.socket.emit("orangeFully", {data:objects,from:sender});
}

Client.socket.on("orangeFully", (data) => {
    objected = {...data.data};
    console.log(objected);
})

const emitWin = () => {
    Client.socket.emit("win",{id:Client.socket.id});
}

Client.socket.on('weIsWin', () => { 
    isWIN = true;
    window.location.replace("https://www.google.com");
})