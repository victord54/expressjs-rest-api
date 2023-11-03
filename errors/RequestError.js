const { MainError } = require('./MainError');

class RequestError extends MainError {
    constructor(message) {
        super(message);
        console.log(this.constructor.name);
        this.name = this.constructor.name;
        this.statusCode = 400;
        this.type = 'request';
    }
}

module.exports = { RequestError };
