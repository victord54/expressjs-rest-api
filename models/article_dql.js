const db = require('../database');

exports.getAll = async () => {
    return db.executeQuery('SELECT * FROM article');
};

exports.get = async ({ id }) => {
    if (id) {
        return db.executeQuery('SELECT * FROM article WHERE id = ?', [id]);
    }
    return null;
};
