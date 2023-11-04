const errorHandler = (err, req, res, next) => {
  // console.log(err,"<<< ini error");
  let status = err.status || 500;
  let message = err.msg || "Internal Server Error";

  switch (err.name) {
    case "EmailPasswordRequired":
      status = 400;
      message = "Email/Password is required";
      break;
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "InvalidEmailPassword":
      status = 401;
      message = "Invalid email/password";
      break;
    case "Unauthorized":
      status = 401;
      message = "Unauthorized: Access token is required";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
    case "Not Found":
      status = 404
      message = err.message
      break;
  }
  res.status(status).json({
    status: status,
    message: message
  })
};
module.exports = errorHandler;
