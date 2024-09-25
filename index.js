const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { emitProfile, emitLength, upDatePlayerNumbers } = require('./socket/Profile.js');
const { onData, orangeFully } = require('./socket/SendData.js');
const { getRandomOrange } = require('./socket/RandomOrange.js');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};
let winStatus = {};

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/disconnect', (req, res) => {
  res.send('<h1>disconnect</h1>');
})

let num = 0;
io.on('connection', (socket) => {
  console.log('connected');
  num = Object.keys(players).length + 1
  players[socket.id] = {
    id: socket.id,
    ...getRandomOrange(num),
    number: Object.keys(players).length + 1
  };
  winStatus[socket.id] = false;

  //emit data
  emitProfile(io, players[socket.id]);
  emitLength(io, Object.keys(players).length);
  upDatePlayerNumbers(io, players);
  onData(socket, io, players);
  orangeFully(socket, io, players);
  socket.on('win', ({ id }) => {
    winStatus[id] = true; 

    const allPlayersHaveWon = Object.keys(players).length > 0 &&
      Object.keys(players).every(playerId => winStatus[playerId] === true);


    if (allPlayersHaveWon) {
      io.emit('weIsWin');
      resetWinStatus(); 
    } else {
      io.emit('weIsNotWin');
    }
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    delete players[socket.id];
    upDatePlayerNumbers(io, players);
    // eimit data
    emitLength(io, Object.keys(players).length);
  });
});

const resetWinStatus = () => {
  Object.keys(players).forEach(playerId => {
    winStatus[playerId] = false; 
  });
};

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
