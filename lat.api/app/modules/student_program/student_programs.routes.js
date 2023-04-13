function Student_programsRoutes(app){
    // import controller
    const Student_programs=require("./student_programs.controller")

    // create a new User for Student_programs
    app.post("/addStudentProgram", Student_programs.create);

    // list Student_programs
     app.get("/listStudentPrograms", Student_programs.getAll);
    
	// get  Student_program with id
     app.get("/getStudentprogramByID/:id", Student_programs.findById);
     
	// get  Student_program with student id
     app.get("/getStudentprogramByStudentID/:id", Student_programs.findBySId);
     
	// get  Student_program with queston id
     app.get("/getStudentprogramByQuestionID/:id", Student_programs.findByQId);
}


module.exports =Student_programsRoutes;