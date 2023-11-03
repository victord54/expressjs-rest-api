const express = require('express');
const cors = require('cors');
const database = require('./database');
const mail = require('./mail');

const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');

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

app.use('/articles', articleRoutes);

app.use('*', (req, res) => {
    return res.status(501).json('No route found');
});

app.use((err, req, res, next) => {
    utils.errorLogFile(err);
    return res.status(500).json({ message: err.message, error: err });
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
        await mail.initMail();
        app.listen(process.env.SRV_PORT, () => {
            console.log(`Server is listening on port ${process.env.SRV_PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error.sqlMessage);
    }
}

startServer();
