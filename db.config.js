const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    },
);

sequelize.sync((error) => {
    console.log('Synchronisation de la base de données KO: ' + error);
});

// sequelize.sync({ force: true }).then(() => {
//     console.log("Synchronisation de la base de données OK");
// });

module.exports = sequelize;
