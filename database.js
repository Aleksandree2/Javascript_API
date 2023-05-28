import mysql from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()



export async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM new_table");
    
    return rows;
}
export async function getNote(id){
    const [rows] = await pool.query(`
    SELECT * FROM 
    new_table 
    where Employe_ID = ?`, [id]);
    return rows[0];
}

export async function createNote( EMP_Name, EMP_LastName, Emp_Age){
    const [result] = await pool.query(`INSERT INTO new_table (Employe_Name,Employe_LastName,Employe_Age  )
    VALUES ( ?, ?, ?)`,[EMP_Name,EMP_LastName,Emp_Age])
    const id = result.insertId
    return getNote(id);
}


