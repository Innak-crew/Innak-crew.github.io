function Student_programsRoutes(app){
    // import controller
    const Student_programs=require("./student_programs.controller")

    // create a new User for Student_programs
    app.post("/addStudentProgram", Student_programs.create);

    // list Student_programs
     app.get("/listStudentPrograms", Student_programs.getAll);
    
	// get single Student_program
     app.get("/getStudentprogram/:id", Student_programs.findById);
}


module.exports =Student_programsRoutes;