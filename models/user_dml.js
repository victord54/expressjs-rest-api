const db = require('../database');

const create = async (data) => {
    return db.executeQuery(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [data.username, data.email, data.password],
    );
};

module.exports = {
    create,
};
