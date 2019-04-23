const inquirer = require('inquirer');

const { checkInventory } = require('./models/customer');

module.exports = function() {
  let questions = [
    {
      type: 'input',
      name: 'productID',
      message: 'Looking for a product? Please enter the product ID'
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'How many you want?',
      filter: Number
    }
  ];

  inquirer.prompt(questions).then(answer => {
    checkInventory(answer.productID, answer.quantity);
  });
};
