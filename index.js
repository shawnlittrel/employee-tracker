const cTable = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');

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
               //SQL Statement for generalized query
               const sqlStatement = `SELECT * FROM departments;`;

               //Query database and output results
               dbConnect(sqlStatement);
          }
          else if (userChoice === 'View All Roles'){
               //SQL Statement for generalized query
               const sqlStatement = `SELECT * FROM roles;`;

               //Query database and output results
               dbConnect(sqlStatement);
          }
          else if (userChoice === 'View All Employees'){
               //SQL Statement for generalized query
               const sqlStatement = `SELECT * FROM employees;`;

               //Query database and output results
               dbConnect(sqlStatement);
          }
          else if (userChoice === 'Add A Department'){
               //Acquire additional data
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
                    //SQL Statement for generalized query
                    const sqlStatement = `INSERT INTO departments (department_name)
                    VALUES
                    ('${deptName}');`

                    //Query database and output results
                    dbConnect(sqlStatement);
               });
          }
          else if (userChoice === 'Add A Role'){
               //Acquire additional data
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
                    //SQL Statement for generalized query
                    const sqlStatement = `INSERT INTO roles (title, salary, department_id)
                    VALUES
                    ('${roleName}', ${salary}, ${department});`

                    //Query database and output results
                    dbConnect(sqlStatement);
               });
          }
          else if (userChoice === 'Add An Employee'){
               //Acquire additional data
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
                    //SQL Statement for generalized query
                    const sqlStatement = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES
                    ('${firstName}','${lastName}', ${roleName}, ${managerID});`
                    
                    //Query database and output results
                    dbConnect(sqlStatement);
               })
          }
          else if (userChoice === 'Update Employee Role'){
               //Acquire additional data
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
                    //SQL Statement for generalized query
                    const sqlStatement = `UPDATE employees SET role_id = ${newRole}, manager_id = ${newManagerID} WHERE id = ${employeeID}; `

                    //Query database and output results
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
          password: 'Z41icwvjk!',
          database: 'employee_tracker' 
     });

     connection.promise().query(query)
     .then( ([ results ]) => {
          console.table(results);
     })
     .then(promptUser());
     //.catch(console.log);   
};

promptUser();