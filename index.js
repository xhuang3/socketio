var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clients = {}
var id = 1
var totalUser = 0

io.on('connection', function (socket) {
  console.log('a user connected');
  clients[socket.id] = socket;
  socket.on('userJoined', (userId) => onUserJoined(userId, socket));
  socket.on('message', (message) => onMessageReceived(message, socket));

  socket.on('disconnect', () => {
    totalUser--
    console.log('a user disconnected, total ' + totalUser);
  });
})

function onUserJoined(userId, socket) {
  try {
    totalUser++
    console.log('user join, total ' + totalUser)
  }
  catch (err) {
    console.err(err);
  }
}

function onMessageReceived(message, socket) {
  socket.emit('message', message);
}

http.listen(3000, function () {
  console.log('listening on *:3000')
});
