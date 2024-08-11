import mysql from 'mysql2';

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost', // Database host
    user: process.env.DB_USER || 'root',      // Database user
    password: process.env.DB_PASSWORD || '',  // Database password
    database: process.env.DB_NAME || 'mydatabase', // Database name
    waitForConnections: true, // Wait for connections to be available
    connectionLimit: 10,     // Maximum number of connections
    queueLimit: 0            // No limit for connection queue
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

export default promisePool;
