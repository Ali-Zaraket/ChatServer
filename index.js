var express = require('express');
const PORT = 5000;

var app = express();
var server = app.listen(PORT, () => {
	console.log(`[LISTENNING] ${PORT}`)
});


var io = require('socket.io')(server, {
	cors:{
		origin: "http://localhost:8000",
		methods: ["GET", "POST"],
		credentials: true
	}
});

app.use(express.static('public'));


io.on('connection', (socket)=>{
	console.log(`[CONNECTION] ${socket.id}`)

	// JOIN ROOM CHAT EVENT	
	 socket.on('join', (data)=>{
	 	socket.join(data.room);
	 })

	// ROOM MESSAGE EVENT 
	 socket.on('roomMSG', (data)=>{
	 	io.to(data.room).emit('serverMSG', data);
	 })

	 // SOCKET DISCONNECTION
	 socket.on('disconnect', ()=>{
	 	console.log('[DISCONNECTION]')
	 })
});
