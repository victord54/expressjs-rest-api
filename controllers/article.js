const Article = require('../models/article_dql');
const fs = require('fs');

exports.getAll = async (req, res, next) => {
    try {
        const users = await Article.getAll();
        if (users.length === 0) throw new RequestError('No users in database');
        users.forEach((user) => {
            user.image = fs.readFileSync(
                './images/img-placeholder.png',
                'base64',
            );
        });
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
