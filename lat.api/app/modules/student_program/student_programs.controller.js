const Student_programs = require("./student_programs.model");
const Joi = require("joi");

//joi validation..
const Schema = Joi.object({
    student_id: Joi.number().integer().required(),
	question_id: Joi.number().integer().required(),
	time_to_complete: Joi.string().required(),
  program_language: Joi.string().required(),
	attend_date: Joi.string().required(),
	attend_time: Joi.string().required(),
	run_count: Joi.number().integer().required(),
	run_time: Joi.string().required()
}).options({ abortEarly: false });

// create_new_account_user plan..
exports.create = function (req, res) {
  console.log(req.body);
  const { error, value } = Schema.validate(req.body);

  if (error === undefined) {
    Student_programs.create(req.body, (error, value) => {
      if (error) {
        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Student_programs.",
        });
      } else
        res.send({
          status: true,
          alert: "",
          message: "Add Student successfully",
        });
    });
  } else {
    res.status(500).send({
      status: false,
      alert: "Failed..!",
      message:
        error.message || "Some error occurred while creating the  Student programs.",
    });
  }
};

// getAll list
exports.getAll = async function (req, res) {
  try {
    let where = [];
		// Start Limit & Page
		const Q = req.query.q;
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const userDetails = await Student_programs.getAll(Q, page,limit);
    res.send({
      status: true,
       alert: "", 
       message: "list successfully ",
      data: userDetails
    } );
  } catch (error) {
    res.status(500).send({
      status: false ,
      alert: "Failed..!" ,
      message: error || "Some error occurred while listing the  Studunt programs." 
    });
  }
};


// get single plan detail
exports.findById = function (req, res) {
	console.log("findById by controller");
	console.log(req.params.id);
  Student_programs.findById(req.params.id, (error, value) => {
    if (error) {
      res.status(500).send({
		  status: false, 
		  alert: "Failed..!",
		  message: error || "Some error occurred in  Student program."
      });
    } else
      res.send({
		  status: true,
		  alert: "",
		  message: "Student program details get successfully",
		  data: value
		  });
  });
};


// get data with Student
exports.findBySId = function (req, res) {
	console.log("findBySId by controller");
	console.log(req.params.id);
  Student_programs.findBySId(req.params.id, (error, value) => {
    if (error) {
      res.status(500).send({
		  status: false, 
		  alert: "Failed..!",
		  message: error || "Some error occurred in  Student program."
      });
    } else
      res.send({
		  status: true,
		  alert: "",
		  message: "Student program details get successfully",
		  data: value
		  });
  });
};


// get data with Question
exports.findByQId = function (req, res) {
	console.log("findByQId by controller");
	console.log(req.params.id);
  Student_programs.findById(req.params.id, (error, value) => {
    if (error) {
      res.status(500).send({
		  status: false, 
		  alert: "Failed..!",
		  message: error || "Some error occurred in  Student program."
      });
    } else
      res.send({
		  status: true,
		  alert: "",
		  message: "Student program details get successfully",
		  data: value
		  });
  });
};

