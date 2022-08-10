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
      type: 'rawlist',
      name: 'updateEmployee',
      message: 'Who will you like to update',
      choices: [`${splitTestArray}`],
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
        //TODO...
        //db.query('SELECT * FROM department', function (err, res) {
            //let departmentArray = [];
            //res.forEach(department => departmentArray.push(department));
            //console.table(departmentArray);
            
        //});
      } else if (answers.options === 'view all roles') {
        //TODO...
      } else if(answers.options === 'view all employees') {
        //TODO...
      } else if (answers.addDepartment){
        db.query(`INSERT INTO department (name) VALUES ('${answers.addDepartment}') `);
        
      } else if (answers.roleDepartment){
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleName}', '${answers.roleSalary}', '${answers.roleDepartment}') `);

      } else if (answers.employeeManager){
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${answers.employeeRole}', '${answers.employeeManager}')`);
      }else if (answers.updateEmployeeRole){
        //TODO: Pull all employees
        //TODO: Update role on selected employee
      }
    });

