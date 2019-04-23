const { connection } = require('../database');

const checkInventory = (productID, quantity) => {
  connection.query(
    'SELECT stock_quantity, quantity_purchased FROM products WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;

      const inventory = res[0].stock_quantity;
      const quantityPurchased = res[0].quantity_purchased;

      if (inventory <= 0) {
        console.log('Insufficient quantity!');
        connection.end();
      } else {
        updateInventory(productID, inventory, quantity);
        updateQuantityPurchased(
          productID,
          inventory,
          quantity,
          quantityPurchased
        );
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

const updateQuantityPurchased = (
  productID,
  inventory,
  quantity,
  quantityPurchased
) => {
  let newQuantityPurchased = 0;
  quantity = parseInt(quantity, 10);

  // if the product has not been purchased yet then set the items purchased quantity equals to the quatity purchased from this order, else the quantity purchased will be added and updated
  if (quantityPurchased == null) {
    newQuantityPurchased = quantity;
  } else {
    newQuantityPurchased = quantityPurchased + quantity;
  }

  connection.query(
    'UPDATE products SET quantity_purchased = ' +
      newQuantityPurchased +
      ' WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;
    }
  );
};

const showTotalCost = (productID, quantity) => {
  connection.query(
    'SELECT price , quantity_purchased FROM products WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;

      const price = res[0].price;
      const quantityPurchased = res[0].quantity_purchased;

      const total = quantity * price;
      const productSales = quantityPurchased * price;

      updateProductSales(productID, productSales);

      console.log('Your total is ', total);
      console.log('Thank you for ordering from our store!');
    }
  );
};

const updateProductSales = (productID, productSales) => {
  connection.query(
    'UPDATE products SET product_sales = ' + productSales + ' WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;
    }
  );

  connection.end();
};

module.exports = {
  checkInventory
};
