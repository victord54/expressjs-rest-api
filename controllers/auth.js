const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const process = require('process');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Validation des données reçues
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
        const user = await User.findOne({ where: { email: email } });

        if (user === null) {
            return res.status(401).json({ message: 'User not found' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res
                .status(401)
                .json({ message: 'Incorrect mail or password' });
        }

        // Création du token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_DURATION + 's' },
        );

        return res.status(200).json({
            token,
        });
    } catch (error) {
        if (error.name == 'SequelizeDatabaseError')
            return res.status(500).json({ message: 'Database Error', error });
        else
            return res
                .status(500)
                .json({ message: 'Login process fail', error });
    }
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    // validation des données reçues
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing parameters' });
    }

    try {
        // vérification de l'unicité des données reçues
        const userEmail = await User.findOne({ where: { email: email } });
        if (userEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const userUsername = await User.findOne({
            where: { username: username },
        });
        if (userUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // salage mot de passe et création de l'utilisateur
        const hash = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUNDS),
        );
        const user = await User.create({
            username: username,
            email: email,
            password: hash,
        });
        return res.status(201).json({ message: 'user created', user });
    } catch (error) {
        if (error.name == 'SequelizeDatabaseError')
            return res.status(500).json({ message: 'Database Error', error });
        else if (error.name == 'BcryptError')
            return res
                .status(500)
                .json({ message: 'Hash Process Error', error });
        else
            return res
                .status(500)
                .json({ message: 'Register process fail', error });
    }
};
