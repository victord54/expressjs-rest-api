const express = require('express');
const cors = require('cors');
const database = require('./database');
const checkToken = require('./jwt/check');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const utils = require('./controllers/utils');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    utils.accessLogFile(req, res, next);
});

app.get('/', (req, res) => {
    return res.json({ message: 'It works !' });
});

app.use('/users', userRoutes);

app.use('/auth', authRoutes);

app.use('*', (req, res) => {
    return res.status(501).json('No route found');
});

/**
 * @description: Démarre le serveur avec test de la connexion à la base de données
 */
async function startServer() {
    try {
        await database.authenticate();
        await database.settingsSQL();
        console.log(
            'Connection to database has been established successfully.',
        );
        app.listen(process.env.SRV_PORT, () => {
            console.log(`Server is listening on port ${process.env.SRV_PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.sqlMessage);
    }
}

startServer();
