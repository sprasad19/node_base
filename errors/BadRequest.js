function BadRequest(message, status, error) {
  this.status = status || 400;
  this.message = message || "badRequest";
  if (error) {
    this.error = error;
  }
}

module.exports = BadRequest;
