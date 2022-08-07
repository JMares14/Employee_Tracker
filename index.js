const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    },
])
.then(answers => {
    console.log('Answer:', answers.options);
});