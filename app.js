const emp = require('./employees')
const express = require('express')
const app = express()
const port = 3001;
app.use(express.json())

app.get('/getEmployeeTable/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await emp.getEmployeeTable(id);
        res.json(employee); 
    } catch (err) {
        next(err); 
    }
   
})

app.get('/getEmployeesTable', async (req, res, next) => {
    try {
        const employees = await emp.getEmployeesTable();
        res.json(employees);

    } catch(err){
        next(err);
    }
})

app.post('/createEmployee', async(req,res) =>{
    try{
        const {first_name, last_name, department, salary, hire_date} = req.body
        const newEmp = await emp.createEmployee(first_name, last_name, department, salary, hire_date)
        res.status(201).send(newEmp)
    } catch(err){
        next(err);
    }
})

app.use((err,req,res,next)=> {
    console.log(err.stack);
    res.status(500).send('something broke!')
})
   

app.listen(port, ()=>{
    console.log(`app is running on port ${port}`);
})
