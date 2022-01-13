class AppError extends Error {
    constructor(message) {
      super(message);
     // Ensure the name of this error is the same as the class name
      this.name = this.constructor.name;
     // This clips the constructor invocation from the stack trace.
     // It's not absolutely essential, but it does make the stack trace a little nicer.
     //  @see Node.js reference (bottom)
      Error.captureStackTrace(this, this.constructor);
    }
  }

  class tooManyReposError extends AppError {
    constructor(message, cause) {
      super(message);
      this.name = this.constructor.name;
      this.cause = cause
    }
  }

  class wrongPasswordError extends AppError {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

  class unknownEmailError extends AppError {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }

module.exports = {
  tooManyReposError,
  wrongPasswordError,
  unknownEmailError
}