const { connection } = require('../database');

const checkInventory = (productID, quantity) => {
  connection.query(
    'SELECT stock_quantity FROM products WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;

      const inventory = res[0].stock_quantity;

      if (inventory <= 0) {
        console.log('Insufficient quantity!');
        connection.end();
      } else {
        updateInventory(productID, res[0].stock_quantity, quantity);
      }
    }
  );
};

const updateInventory = (productID, stock, quantity) => {
  let newQuantity = stock - quantity;

  connection.query(
    'UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;
      showTotalCost(productID, quantity);
    }
  );
};

const showTotalCost = (productID, quantity) => {
  connection.query(
    'SELECT price FROM products WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;

      const total = quantity * res[0].price;

      console.log('Your total is ', total);
      console.log('Thank you for ordering from our store!');
    }
  );

  connection.end();
};

module.exports = {
  checkInventory
};
