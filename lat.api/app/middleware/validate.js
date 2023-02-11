
const dotenv = require('dotenv');
dotenv.config();


// Middleware to check for API key
module.exports = {
  checkApiKey: (req, res, next) => {
    if (req.query.apiKey !== process.env.API_KEY_SECRET) {
    return res.status(401).send({
		error: 'Unauthorized',
		message:'Missing apiKey or apiKey Invalid '
		});
  }
  next();
  },
};
