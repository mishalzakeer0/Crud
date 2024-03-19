const mysql = require("mysql2");
const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.DATABASE);
const pool = mysql
  .createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'mz',
  })
  .promise();

async function getEmployeesTable() {
  const result = await pool.query("SELECT * FROM EMPLOYEES;");
  // console.log(result);
  return result;
}

async function getEmployeeTable(id) {
  const [result] = await pool.query(`SELECT * FROM EMPLOYEES WHERE id = ?`,[id])
  return result
}

// const employees = getEmployeesTable().then((result)=> console.log(result));

// getEmployeesTable()

// const employee = getEmployeeTable(1).then((result)=> console.log(result));
