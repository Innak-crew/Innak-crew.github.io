module.exports = app => {
    require("./app/modules/student/students.routes")(app);
	require("./app/modules/question/questions.routes")(app);
	require("./app/modules/student_program/student_programs.routes")(app);
};