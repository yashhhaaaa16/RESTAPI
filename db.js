require('dotenv').config();
const mysql=require('mysql');

const connection=mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

connection.connect((error)=>{
    if(error) throw error;
    console.log("Connection Done Successfully with DataBase")
});

module.exports = connection;