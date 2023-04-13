function StudentsRoutes(app){
    // import controller
    const Students=require("./students.controller")

    // create a new User for Students
    app.post("/addStudent", Students.create);

    // list Students
     app.get("/listStudents", Students.getAll);
    
	// get single Student
     app.get("/getStudent/:id", Students.findById);

    //update Student
     app.put("/updateStudent/:id", Students.update);

    // delete Student
     app.delete("/deleteStudent/:id", Students.remove);
}


module.exports =StudentsRoutes;