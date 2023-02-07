/**
 * @see https://github.com/expressjs/express/blob/master/examples/web-service/index.js#L13
 */
function error(status, msg) {
  const err = new Error(msg);
  err.status = status;
  return err;
}

module.exports = error;
