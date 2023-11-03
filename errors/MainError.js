class MainError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = 500;
        this.type = 'unknown';
    }
}

module.exports = { MainError };
