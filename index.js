const express = require('express');
const cors = require('cors');
const db = require('./db.config');
const checkToken = require('./jwt/check');
const bcrypt = require('bcrypt');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const utils = require('./controllers/utils');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.json('It works !');
});

app.use((req, res, next) => {
    utils.accessLogFile(req, res, next);
});
app.use('/users', checkToken, userRoutes);

app.use('/auth', authRoutes);

app.use('*', (req, res) => {
    return res.status(501).json('No route found');
});

/**
 * @description: Démarre le serveur avec test de la connexion à la base de données
 */
db.authenticate()
    .then(() => console.log('Connexion à la base de données réussie'))
    .then(() => {
        app.listen(process.env.SRV_PORT, () => {
            console.log(`Server is running on port ${process.env.SRV_PORT}`);
        });
    })
    .catch((error) =>
        console.log('Connexion à la base de données échouée: ' + error),
    );
