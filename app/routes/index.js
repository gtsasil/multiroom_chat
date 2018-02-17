module.exports = function(application){
	application.get('/', function(req, res){
//navegar ate controller
//a funcao(applicatio).folder(app).folder(controller).file(index.js).funcao_dentreo_de_index.js(home())
		application.app.controllers.index.home(application, req, res);
	});
}