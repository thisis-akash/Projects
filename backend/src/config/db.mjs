import mysql from "mysql2/promise";
import dotenvFlow from "dotenv-flow";

dotenvFlow.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection()
    .then(conn => {
        console.log("MySQL connection pool established");
        conn.release();
    })
    .catch(err => {
        console.error("MySQL connection failed", err);
    });

export default pool;
