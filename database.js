const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const commitTransaction = async () => {
    try {
        await executeQuery('COMMIT');
    } catch (error) {
        throw error;
    }
};

const rollbackTransaction = async () => {
    try {
        await executeQuery('ROLLBACK');
    } catch (error) {
        throw error;
    }
};

const executeQuery = async (sql, values) => {
    try {
        const [rows] = await pool.query(sql, values);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const authenticate = async () => {
    try {
        // console.error(pool);
        executeQuery('SELECT 1');
    } catch (error) {
        throw error;
    }
};

const settingsSQL = async () => {
    try {
        executeQuery(
            'SET SESSION sql_mode = "ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION"',
        );
        executeQuery('SET SESSION autocommit = 0');
    } catch (error) {
        throw error;
    }
};

module.exports = {
    settingsSQL,
    authenticate,
    commitTransaction,
    rollbackTransaction,
    executeQuery,
};
