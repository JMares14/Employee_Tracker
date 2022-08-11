const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: 'root',
    password: 'DGKallday123410!',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);


inquirer
  .prompt([
    
  
    {
      type: 'rawlist',
      name: 'options',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    },
    {
      type: 'input',
      name:  'addDepartment',
      message: 'Enter the name of the department',
      when: (answers) => answers.options === 'add a department',
    },
    {
      type: 'input',
      name: 'roleName',
      message: 'Enter role name',
      when: (answers) => answers.options === 'add a role',
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter role salary',
      when: (answers) => (answers.roleName),
    },
    {
      type: 'input',
      name: 'roleDepartment',
      message: 'Enter department for the role',
      when: (answers) => (answers.roleSalary)
    },
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'Enter first name of the employee',
      when: (answers) => answers.options === 'add an employee',
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'Enter last name of the employee',
      when: (answers) => (answers.employeeFirstName),
    },
    {
      type: 'input',
      name: 'employeeRole',
      message: "Enter the employee's role id",
      when: (answers) => (answers.employeeLastName),
    },
    {
      type: 'input',
      name: 'employeeManager',
      message: "Enter employee's manager id",
      when: (answers) => (answers.employeeRole),
    },
    {
      type: 'input',
      name: 'updateEmployee',
      message: 'Enter the name of the employee',
      when: (answers) => answers.options ==='update an employee role',
    },
    {
      type: 'input',
      name: 'updateEmployeeRole',
      message: 'What is the new role id for the employee',
      when: (answers) => (answers.updateEmployee),
    }
])
.then(answers => {
    if (answers.options === 'view all departments') {
        db.query('SELECT * FROM department', function (err, res) {
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            db.end()
        });
      } else if (answers.options === 'view all roles') {
        let rolesArray = [];
        db.query('SELECT * FROM role', function (err, res) {
            res.forEach(role => rolesArray.push(role));
            console.table(rolesArray);
            db.end()
        });
      } else if(answers.options === 'view all employees') {
        let employeetArray = [];
        db.query('SELECT * FROM employee', function (err, res) {
        res.forEach(employee => employeetArray.push(employee));
        console.table(employeetArray);
        db.end()
        });
      } else if (answers.addDepartment){
        db.query(`INSERT INTO department (name) VALUES ('${answers.addDepartment}') `);
        console.log('Department has been added');
        db.end();
      } else if (answers.roleDepartment){
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleName}', '${answers.roleSalary}', '${answers.roleDepartment}') `);
        console.log('Role has been added')
        db.end()
      } else if (answers.employeeManager){
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${answers.employeeRole}', '${answers.employeeManager}')`);
        console.log('Employee hasa been added')
        db.end()
      }else if (answers.updateEmployeeRole){
        db.query(`UPDATE employee SET role_id =${answers.updateEmployeeRole} WHERE first_name = '${answers.updateEmployee}'`)
        console.log('Employee has been updated')
        db.end()
      }
    });

