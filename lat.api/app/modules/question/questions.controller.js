const Questions = require("./questions.model");
const Joi = require("joi");

//joi validation..
const Schema = Joi.object({
    question_text: Joi.string().required(),
	test_case: Joi.required(),
}).options({ abortEarly: false });

// create_new_account_user plan..
exports.create = function (req, res) {
  console.log(req.body);
  const { error, value } = Schema.validate(req.body);

  if (error === undefined) {
    Questions.create(req.body, (error, value) => {
      if (error) {
        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while creating the  Questions.",
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
        error.message || "Some error occurred while creating the  Questions.",
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
		const userDetails = await Questions.getAll(Q, page,limit);
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
      message: error || "Some error occurred while listing the   Questions." 
    });
  }
};


// get single plan detail
exports.findById = function (req, res) {
	console.log("findById by controller");
	console.log(req.params.id);
  Questions.findById(req.params.id, (error, value) => {
    if (error) {
      res.status(500).send({
		  status: false, 
		  alert: "Failed..!",
		  message: error || "Some error occurred in   Question data."
      });
    } else
      res.send({
		  status: true,
		  alert: "",
		  message: " Question details get successfully",
		  data: value
		  });
  });
};



// update a plan
exports.update = function (req, res) {
  const { error, value } = Schema.validate(req.body);

  if (error === undefined) {
  Questions.updateById(req.params.id,
    { ...req.body },
    (error, value) => {
      if (error) {
        res.status(500).send({
          status: false,
          alert: "Failed..!",
          message:
            error || "Some error occurred while Updating the  Question."
        });
      } else
        res.send({
          status: true,
          alert: "",
          message: "update successfully",
        });
    }
  );
  }
};


//  delete a plan
exports.remove = function (req, res) {
  Questions.remove(req.params.id, (error, value) => {
    if (error) {
      res.status(500).send({
        status: false,
        alert: "Failed..!",
        message: error || "Some error occurred while deleting Question."
      });
    } else
      res.send({
        status: true,
        alert: "",
        message: "delete successfully",
      });
  });
};
