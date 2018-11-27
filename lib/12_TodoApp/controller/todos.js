module.exports = function(app){

	todos = [{item: "rice"}, {item: "dal"}, {item: "piyaj"}]
	app.get("/todos", function(req, res){	
		console.log(req.query)

		res.render("todos",{todos: todos, qs:req.query})
	})

	app.post("/todo", function(req, res){

	})

	app.delete("/todo", function(req, res){

	})

}