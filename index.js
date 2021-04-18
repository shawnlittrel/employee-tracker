const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');
//const db = require('./db/connection');





function promptUser(){
     inquirer.prompt([
          {
               type: 'list',
               name: 'userChoice',
               loop: false,
               choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add An Employee',
                    'Update Employee Role'
               ]
          }
     ])
     .then(({ userChoice }) => {
          if (userChoice === 'View All Departments'){
               const sqlStatement = `SELECT * FROM departments;`;

               dbConnect(sqlStatement);
          }
          else if (userChoice === 'View All Roles'){
               const sqlStatement = `SELECT * FROM roles;`;

               dbConnect(sqlStatement);
          }
          else if (userChoice === 'View All Employees'){
               const sqlStatement = `SELECT * FROM employees;`;

               dbConnect(sqlStatement);
          }
          else if (userChoice === 'Add A Department'){
               inquirer.prompt([
                    {
                         type: 'input',
                         name: 'deptName',
                         message: 'What is the name of the new department?',
                         validate: deptNameInput => {
                              if (deptNameInput){
                                   return true
                              } else {
                                   console.log('Please enter a name for the department.');
                                   return false;
                              }
                         }
                    }
               ]).then(({ deptName }) => {
                    const sqlStatement = `INSERT INTO departments (department_name)
                    VALUES
                    ('${deptName}');`
                    dbConnect(sqlStatement);
               });
          }
          else if (userChoice === 'Add A Role'){
               inquirer.prompt([
                    {
                         type: 'input',
                         name: 'roleName',
                         message: 'What is the title of the new role?',
                         validate: roleNameInput => {
                              if (roleNameInput){
                                   return true
                              } else {
                                   console.log('Please enter a title for the role.');
                                   return false;
                              }
                         }
                    },
                    {
                         type: 'input',
                         name: 'salary',
                         message: 'What is the salary of the new role? (Numbers only)',
                         filter: Number
                    },
                    {
                         type: 'list',
                         name: 'department',
                         message: 'Which department does this role belong to?',
                         choices: [
                              'Management',
                              'Engineering',
                              'Sales',
                              'Installation',
                              'Service'
                         ],
                         filter: function(choice){
                              if(choice === 'Management'){return 1}
                              if(choice === 'Engineering'){return 2}
                              if(choice === 'Sales'){return 3}
                              if(choice === 'Installation'){return 4}
                              if(choice === 'Service'){return 5}
                         }
                    }
               ]).then(({ roleName, salary, department }) => {
                    const sqlStatement = `INSERT INTO roles (title, salary, department_id)
                    VALUES
                    ('${roleName}', ${salary}, ${department});`
                    dbConnect(sqlStatement);
               });
          }
          else if (userChoice === 'Add An Employee'){
               inquirer.prompt([
                    {
                         type: 'input',
                         name: 'firstName',
                         message: `What is the employee's first name?`
                    },
                    {
                         type: 'input',
                         name: 'lastName',
                         message: `What is the employee's last name?`
                    },
                    {
                         type: 'list',
                         name: 'roleName',
                         message: `What is the employee's role?`,
                         choices:[
                              'General Manager',
                              'Engineering Manager',
                              'Sales Manager',
                              'Field Manager',
                              'Engineer',
                              'Salesperson',
                              'Scheduler',
                              'Install Technician',
                              'Service Technician'
                         ],
                         filter: function(choice){
                              if(choice === 'General Manager'){return 1}
                              if(choice === 'Engineering Manager'){return 2}
                              if(choice === 'Sales Manager'){return 3}
                              if(choice === 'Field Manager'){return 4}
                              if(choice === 'Engineer'){return 5}
                              if(choice === 'Salesperson'){return 6}
                              if(choice === 'Install Technician'){return 7}
                              if(choice === 'Service Technician'){return 8}
                         }
                    },
                    {
                         type: 'list',
                         name: 'managerID',
                         message: `Who is the employee's manager?`,
                         choices:[
                              'Francesca January',
                              'Misti Glasscock',
                              'Winnie Catalano',
                              'Jimmy Buchler',
                              'None'
                         ],
                         filter: function(choice){
                              if(choice === 'Francesca January'){return 1}
                              if(choice === 'Misti Glasscock'){return 2}
                              if(choice === 'Winnie Catalano'){return 3}
                              if(choice === 'Jimmy Buchler'){return 4}
                              if(choice === 'None'){return NULL}
                         }
                    }
               ]).then(({ firstName, lastName, roleName, managerID }) => {
                    const sqlStatement = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES
                    ('${firstName}','${lastName}', ${roleName}, ${managerID});`
                    dbConnect(sqlStatement);
               })
          }
          else if (userChoice === 'Update Employee Role'){
               inquirer.prompt([
                    {
                         type: 'input',
                         name: 'employeeID',
                         message: `What is the employee's ID number?`,
                         filter: Number
                    },
                    {
                         type: 'list',
                         name: 'newRole',
                         message: `What is the employee's new role?`,
                         choices:[
                              'General Manager',
                              'Engineering Manager',
                              'Sales Manager',
                              'Field Manager',
                              'Engineer',
                              'Salesperson',
                              'Scheduler',
                              'Install Technician',
                              'Service Technician'
                         ],
                         filter: function(choice){
                              if(choice === 'General Manager'){return 1}
                              if(choice === 'Engineering Manager'){return 2}
                              if(choice === 'Sales Manager'){return 3}
                              if(choice === 'Field Manager'){return 4}
                              if(choice === 'Engineer'){return 5}
                              if(choice === 'Salesperson'){return 6}
                              if(choice === 'Install Technician'){return 7}
                              if(choice === 'Service Technician'){return 8}
                         }
                    },
                    {
                         type: 'confirm',
                         name: 'newManagerConfirm',
                         message: 'Will the employee have a new manager?'
                    },
                    {
                         type: 'list',
                         name: 'newManagerID',
                         choices:[
                              'Francesca January',
                              'Misti Glasscock',
                              'Winnie Catalano',
                              'Jimmy Buchler',
                              'None'
                         ],
                         filter: function(choice){
                              if(choice === 'Francesca January'){return 1}
                              if(choice === 'Misti Glasscock'){return 2}
                              if(choice === 'Winnie Catalano'){return 3}
                              if(choice === 'Jimmy Buchler'){return 4}
                              if(choice === 'None'){return NULL}
                         },
                         when: newManagerConfirm = true
                    }
               ]).then(({ employeeID, newRole, newManagerID }) => {
                    console.log(employeeID);
                    console.log(newRole);
                    const sqlStatement = `UPDATE employees SET role_id = ${newRole}, manager_id = ${newManagerID} WHERE id = ${employeeID}; `

                    dbConnect(sqlStatement);
               })
          }
     })
     .catch(error => {
          console.log('ERROR: ' + error);
     });
};

function dbConnect(query){
     const connection = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'employee_tracker' 
     });

     connection.promise().query(query)
     .then( ([ results ]) => {
          console.table(results);
     })
     .catch(console.log);   
};

promptUser();
