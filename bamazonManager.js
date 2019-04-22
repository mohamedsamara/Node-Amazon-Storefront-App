const inquirer = require('inquirer');

const {
  getProducts,
  getLowInventoryProducts,
  updateStock,
  addProduct
} = require('./models/manager');

module.exports = function() {
  let question = {
    type: 'list',
    name: 'option',
    message: 'What would you like to do today?',
    choices: [
      'View Products for Sale',
      'View Low Inventory',
      'Add to Inventory',
      'Add New Product'
    ]
  };

  inquirer.prompt(question).then(menu => {
    switch (menu.option) {
      case 'View Products for Sale':
        getProducts();
        break;
      case 'View Low Inventory':
        getLowInventoryProducts();
        break;
      case 'Add to Inventory':
        showUpdateStockView();
        break;
      case 'Add New Product':
        showAddProductView();
        break;
    }
  });

  const showUpdateStockView = () => {
    let questions = [
      {
        type: 'input',
        name: 'product',
        message: 'Please enter the product ID',
        filter: Number
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Please enter the quantity you want to add',
        filter: Number
      }
    ];

    inquirer.prompt(questions).then(answer => {
      updateStock(answer.product, answer.quantity);
    });
  };

  const showAddProductView = () => {
    let questions = [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter the product name'
      },
      {
        type: 'input',
        name: 'department',
        message: 'Please enter the category of this product'
      },
      {
        type: 'input',
        name: 'price',
        message: 'Please enter the price of this product',
        filter: Number
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'Please enter the quantity of this product',
        filter: Number
      }
    ];

    inquirer.prompt(questions).then(answer => {
      addProduct(answer.name, answer.department, answer.price, answer.quantity);
    });
  };
};
