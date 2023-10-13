const handleNotFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.method} ${req.originalUrl}`);
  error.code = "NOT_FOUND";
  res.statusCode = 404;
  next(error);
};

const handle500Error = (err, req, res, _next) => {
  const { code, message, stack } = err;
  res.statusCode = res.statusCode < 400 ? 500 : res.statusCode;
  const errorRes = {
    message,
  };
  if (code) {
    errorRes.code = code;
  }
  if (process.env.NODE_ENV === "development") {
    errorRes.stack = stack;
  }
  res.send(errorRes);
};
module.exports = {
  handle500Error,
  handleNotFound,
};
