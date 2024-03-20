const mysql = require("mysql2");
const dotenv = require('dotenv')
dotenv.config()
const pool = mysql
  .createPool({
    host: process.env.HOST,
    user: process.env.USER2,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
  })
  .promise();

async function getEmployeesTable() {
  const result = await pool.query("SELECT * FROM EMPLOYEES;");
  return result[0];
}

async function getEmployeeTable(id) {
  const [result] = await pool.query(`SELECT * FROM EMPLOYEES WHERE id = ?`,[id])
  return result
}


async function createEmployee(first_name, last_name, department, salary, hire_date) {
  const result = await pool.query(`INSERT INTO EMPLOYEES (first_name, last_name, department, salary, hire_date) VALUES(?, ?, ?, ?, ?)`, [first_name, last_name, department, salary, hire_date])
  const id = result[0].insertId
  const newEmployee = getEmployeeTable(id).then((result)=> result[0])
  return newEmployee
}

async function deleteEmployee(id) {
  const result = await pool.query(`DELETE FROM EMPLOYEES WHERE id = ?`,[id])
  const newTable = getEmployeesTable().then((result)=>result)
  return newTable
  
}

async function resetTable() {
  const result = await pool.query('SET  @num := 0;UPDATE employees SET id = @num := (@num+1);ALTER TABLE employees AUTO_INCREMENT =1;')
  const resetedTable = getEmployeesTable().then((result)=> result)
  return resetedTable;
}
// const employees = getEmployeesTable().then((result)=> console.log(result));

// getEmployeesTable()

// const employee = getEmployeeTable(11).then((result)=> console.log(result));

// const insertValue = createEmployee('mishal', 'zakeer', 'IT', '12000', '2024/02/05').then((newEmployee) => console.log(newEmployee))

// const dlt = deleteEmployee(12).then((result)=> console.log(result))

// const reset = resetTable().then((resetedTable)=> console.log(resetedTable[0]))

module.exports = {
  getEmployeesTable,
  getEmployeeTable,
  createEmployee,
  deleteEmployee,
  resetTable
}