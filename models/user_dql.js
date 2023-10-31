const db = require('../database');

exports.getAll = async () => {
    return db.executeQuery('SELECT * FROM users');
};

exports.get = async ({ id, email, username }) => {
    if (id) {
        return db.executeQuery('SELECT * FROM users WHERE id = ?', [id]);
    }
    if (email) {
        return db.executeQuery('SELECT * FROM users WHERE email = ?', [email]);
    }
    if (username) {
        return db.executeQuery('SELECT * FROM users WHERE username = ?', [
            username,
        ]);
    }
    return null;
};
