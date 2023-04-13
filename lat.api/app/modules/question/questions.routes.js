function QuestionsRoutes(app){
    // import controller
    const Questions=require("./questions.controller")

    // create a new User for Questions
    app.post("/addQuestion", Questions.create);

    // list Questions
     app.get("/listQuestions", Questions.getAll);
    
	// get single Question
     app.get("/getQuestion/:id", Questions.findById);

    //update Question
     app.put("/updateQuestion/:id", Questions.update);

    // delete Question
     app.delete("/deleteQuestion/:id", Questions.remove);
}


module.exports =QuestionsRoutes;