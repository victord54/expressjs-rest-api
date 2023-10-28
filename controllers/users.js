const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        if (users === null)
            return res.status(404).json({ message: 'Users not found' });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        if (!userId)
            return res.status(400).json({ message: 'Missing parameter' });
        const user = await User.findByPk(userId);
        if (user === null)
            return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.createUser = async (req, res) => {
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

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    // Vérification champs id présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        // Recherche de l'utilisateur à modifier
        const user = await User.findByPk(userId);
        // Vérification de l'existence de l'utilisateur
        if (user === null) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Mise à jour de l'utilisateur
        const userUpdated = await User.update(req.body, {
            where: { id: userId },
        });
        return res.status(200).json({ message: 'User updated', userUpdated });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    // Vérification champs id présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        const userDestroyed = await User.destroy({ where: { id: userId } });
        if (userDestroyed === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};

exports.restoreUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    // Vérification champs id présent et cohérent
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' });
    }

    try {
        const userRestored = await User.restore({ where: { id: userId } });
        if (userRestored === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User restored' });
    } catch (error) {
        return res.status(500).json({ message: 'Database Error', error });
    }
};
