var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var db = require('./lib/db');

app.use('/', express.static('client/'));

io.on('connection', function(socket){

	// инициализация пользователья
	socket.on('init-user', function (user) {
		db.select('SELECT `id`, `from`, `message`, `date_added` FROM chat_messages ORDER BY date_added ASC').then(function (res) {
			socket.emit('get init-user', res);
        });
    });

	// добавления сообщении
	socket.on('send message', function (data) {
		db.insert('chat_messages', {
			from: data.user,
			message: data.message
		}).then(function () {
			db.select('SELECT * FROM chat_messages ORDER BY date_added DESC LIMIT 1').then(function (res) {
                io.emit('get message', res[0]);
            });
        });
    });
});

http.listen(3000);