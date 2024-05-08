import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost', // or your database host
    user: 'root',
    password: 'Abcd1234',
    database: 'recipe'
});

export default pool.promise();
