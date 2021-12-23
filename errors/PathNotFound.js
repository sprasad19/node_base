function NotFoundException(message, status) {
  this.status = status || 404;
  this.message = message || 'doesNotExit'
}

module.exports = NotFoundException;
