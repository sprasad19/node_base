// eslint-disable-next-line no-unused-vars
 const ErrorHandler = (err, req, res, next) => {
    const { status, message, errors } = err;
    let validationErrors;
    if (errors) {
      validationErrors = {};
      errors.forEach((error) => (validationErrors[error.param] = req.t(error.msg)));
    }
    res.status(status).send({
      path: req.protocol + '://' + req.get('host') + req.originalUrl,
      timestamp: new Date().getTime(),
      message: req.t(message),
      validationErrors,
    });
  };
  module.exports = ErrorHandler