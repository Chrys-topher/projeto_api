import mysql from 'mysql2/promise';

const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password: 'usbw',
    database: 'apitcc_db',
})

export default mySqlPool;
