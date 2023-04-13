//  import sql
const sql = require("../../config/db.config");
const students = function (orgType) {};

//user_account_create function..
students.create = (newstudents, result) => {
  sql.query(`SELECT * FROM students WHERE student_email = '${newstudents.student_email }' AND status !='D';`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    else if(res.length == 0){
      sql.query(`INSERT INTO students SET ?`, newstudents, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { ...newstudents });
      });
    }
    else{
      result(err || "Email id already used..",null);
    }
  });


};

//get_all_user_data function..
students.getAll = (Q, page,limit) => {

  return new Promise((resolve, reject) => {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		var key_value = Q+"%";
		console.log(key_value);
    if (Q != undefined){
		var Query = `select * from students where ((student_id LIKE '${key_value}') or(student_name LIKE '${key_value}%') or (student_email LIKE '${key_value}%'))and status != 'D' ;`;
    }
    else{
      var Query = `select * from students where status != 'D' ;`
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
students.updateById = (id, students, result) => {
  sql.query(`SELECT * FROM students WHERE student_email = '${students.email_id}' AND status !='D';`, (err, res) => {
    if (err) {
		 console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 1) {
      result("Email id is already used..", null);
      return;
    }
    sql.query(
		 "UPDATE students SET student_name = ?, student_email = ?, updated_at = NOW() WHERE student_id = ?;",
      [students.student_name, students.student_email, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
		console.log(`updated students: ${id}`, { id: id, ...students });
        result(null, { id: id, ...students });
      }
    );
  });
};




//find function..
students.findById = (id, result) => {
  sql.query(`SELECT * FROM  students WHERE student_id =${id} and status != 'D'`, (err, res) => {
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
students.remove = (id, result) => {
  sql.query(`UPDATE  students SET status = 'D' WHERE student_id = ?`, id, (err, res) => {
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

module.exports = students;
