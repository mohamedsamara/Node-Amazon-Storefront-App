const inquirer = require('inquirer');

const { viewDepartmentSales, addDepartment } = require('./models/supervisor');

module.exports = function() {
  let question = {
    type: 'list',
    name: 'option',
    message: 'What would you like to do today?',
    choices: ['View Product Sales by Department', 'Create New Department']
  };

  inquirer.prompt(question).then(menu => {
    switch (menu.option) {
      case 'View Product Sales by Department':
        viewDepartmentSales();
        break;
      case 'Create New Department':
        showAddDepartmenttView();
        break;
    }
  });

  const showAddDepartmenttView = () => {
    let questions = [
      {
        type: 'input',
        name: 'department',
        message: 'Please enter the department name'
      },
      {
        type: 'input',
        name: 'overhead',
        message: 'Please enter the overhead costs for this department',
        filter: Number
      }
    ];

    inquirer.prompt(questions).then(answer => {
      addDepartment(answer.department, answer.overhead);
    });
  };
};
