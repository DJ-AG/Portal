// Define a custom error handling class called ErrorResponse
class ErrorResponse extends Error {
    // Explicitly declare the statusCode property
    statusCode: number;

    // The constructor takes two parameters - a message (string) and a status code (number)
    constructor(message: string, statusCode: number) {
        // Call the constructor of the superclass Error with the message parameter
        super(message);

        // Set a custom statusCode property using the provided statusCode parameter
        this.statusCode = statusCode;

        // Maintaining proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ErrorResponse);
        }

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}

export default ErrorResponse;