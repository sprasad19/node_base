const schema = require("./index");

exports.requestValidators = (schemaName , query, type='body') => {
  if (!schemaName) throw Error("Please Provide a valid Schema");
  return async (req, res, next) => {
    // const body = query;
    schema[schemaName]
      .validate({ ...query }, { abortEarly: false })
      .then((value) => {
        const cast = schema[schemaName].cast(query, { stripUnknown: true });
        req[type] = cast;
        next();
      })
      .catch((err) => {
        const error = {};
        if (err && err.inner) {
          const inner = err.inner;
          inner.map((item, index) => {
            return (error[item.path] = item.message);
          });
        } else {
          error = err;
        }

        return next(new BadRequest("badRequest", 400, error));
      });
  };
};
