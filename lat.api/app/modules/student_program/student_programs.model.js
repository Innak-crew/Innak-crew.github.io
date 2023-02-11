//  import sql
const sql = require("../../config/db.config");
const Student_programs = function (orgType) {};

//user_account_create function..
Student_programs.create = (newStudent_programs, result) => {
 sql.query(`INSERT INTO Student_programs SET ?`, newStudent_programs, (err, res) => {
        if (err) {
			console.log(err);
          result(err, null);
          return;
        }
        result(null, { ...newStudent_programs });
      });
};

//get_all_user_data function..
Student_programs.getAll = (Q, page,limit) => {

  return new Promise((resolve, reject) => {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		var key_value = Q+"%";
		console.log(key_value);
    if (Q != undefined){
		var Query = `select * from Student_programs where ((student_id LIKE '${key_value}') or(question_id LIKE '${key_value}') or (student_program_id LIKE '${key_value}'))and status != 'D' ;`;
    }
    else{
      var Query = `select * from Student_programs where status != 'D' ;`
    }
    sql.query(Query,(err,model,field)=>{
     
		if (err) throw err;
			const results = {};
		if (endIndex < model.length) {
		results.next = {
			page: page + 1,
			limit: limit};
		}
		if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit};
		}	
		results.results = model.slice(startIndex, endIndex);
    if (page == NaN && page == NaN)
    {
    var data = JSON.parse(JSON.stringify(results));
  }
    else{
    var data = JSON.parse(JSON.stringify(model));
    }
    resolve(data);		
		})
  });
};




//Update function..
Student_programs.updateById = (id, Student_programs, result) => {
 
    sql.query(
		 "UPDATE Student_programs SET student_id = ?, question_id = ?, time_to_complete = ?, attend_date = ?, attend_time = ?, run_count = ?, run_time = ? updated_at = NOW() WHERE student_program_id = ?;",
      [Student_programs.student_id, Student_programs.question_id, Student_programs.time_to_complete,Student_programs.attend_date,Student_programs.attend_time,Student_programs.run_count,Student_programs.run_time, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
		console.log(`updated Student_programs: ${id}`, { id: id, ...Student_programs });
        result(null, { id: id, ...Student_programs });
      }
    );

};




//find function..
Student_programs.findById = (id, result) => {
  sql.query(`SELECT * FROM  Student_programs WHERE student_id =${id} and status != 'D'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found
    result({ kind: "not_found" }, null);
  });
};

//deleting function..
Student_programs.remove = (id, result) => {
  sql.query(`UPDATE  Student_programs SET status = 'D' WHERE student_id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`deleted  student  with id: ${id}`);
    result(null, res);
  });
};

module.exports = Student_programs;
