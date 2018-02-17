/* importar config do servidor */
var app = require('./config/server');

//parametrizar a porta escuta. A porta que o server vai responder
var server = app.listen(80, function(){
	console.log('Servidor online');
});

var io = require('socket.io').listen(server);

// temos uma variavel 'io', dentro do obejto espress=(app)
app.set('io', io);

//criar a conexao p websocket
io.on('connection', function(socket){
	console.log('Usuário conectou');

	socket.on('disconnect', function(){
		console.log('Usuário desconectado');

	});

	socket.on('msgParaServidor', function(data){
		//dialogo
		socket.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem }
		);

		socket.broadcast.emit(
			'msgParaCliente',
			{apelido: data.apelido, mensagem: data.mensagem }
		);
		//participantes
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){ 
			socket.emit(
				'participantesParaCliente',
				{apelido: data.apelido }
			);

			socket.broadcast.emit(
				'participantesParaCliente',
				{apelido: data.apelido }
			);
		}
	});

});