//  import sql
const sql = require("../../config/db.config");
const questions = function (orgType) {};

// Question_create function..
questions.create = (newquestions, result) => {
  sql.query(`SELECT * FROM questions WHERE question_text = '${newquestions.question_text }' AND status !='D';`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    else if(res.length == 0){
      sql.query(`INSERT INTO questions SET ?`, newquestions, (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        result(null, { ...newquestions });
      });
    }
    else{
      result(err || "question already used..",null);
    }
  });


};

//get_all_user_data function..
questions.getAll = (Q, page,limit) => {

  return new Promise((resolve, reject) => {
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		var key_value = Q+"%";
		console.log(key_value);
    if (Q != undefined){
		var Query = `select * from questions where ((question_text '${key_value}') or(test_case LIKE '${key_value}%')or(question_id  LIKE '${key_value}%') )and status != 'D' ;`;
    }
    else{
      var Query = `select * from questions where status != 'D' ;`
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
questions.updateById = (id, questions, result) => {
  sql.query(`SELECT * FROM questions WHERE question_text = '${questions.question_text}' AND status !='D';`, (err, res) => {
    if (err) {
		 console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      result("question already used..", null);
      return;
    }
    sql.query(
		 "UPDATE questions SET question_text = ?, test_case = ?, updated_at = NOW() WHERE question_id = ?;",
      [questions.question_text, questions.test_case, id],
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        }
        if (res.affectedRows === 0) {
          result({ kind: "not_found" }, null);
          return;
        }
		console.log(`updated questions: ${id}`, { id: id, ...questions });
        result(null, { id: id, ...questions });
      }
    );
  });
};




//find function..
questions.findById = (id, result) => {
  sql.query(`SELECT * FROM  questions WHERE question_id  =${id} and status != 'D'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found question: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found
    result({ kind: "not_found" }, null);
  });
};

//deleting function..
questions.remove = (id, result) => {
  sql.query(`UPDATE  questions SET status = 'D' WHERE question_id = ?`, id, (err, res) => {
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
    console.log(`deleted  question   id: ${id}`);
    result(null, res);
  });
};

module.exports = questions;
