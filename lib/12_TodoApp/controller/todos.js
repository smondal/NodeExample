module.exports = function(app){

	todos = [{item: "rice"}, {item: "dal"}, {item: "piyaj"}]
	app.get("/todos", function(req, res){
		res.render("todos",{todos: todos})
	})

	app.post("/todo", function(req, res){

	})

	app.delete("/todo", function(req, res){

	})

}