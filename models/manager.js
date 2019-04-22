const { connection } = require('../database');

const getProducts = (productID, quantity) => {
  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;

    console.table(res);
    connection.end();
  });
};

const getLowInventoryProducts = (productID, quantity) => {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5 ', function(
    err,
    res
  ) {
    if (err) throw err;

    console.table(res);
    connection.end();
  });
};

const updateStock = (productID, quantity) => {
  connection.query(
    'SELECT stock_quantity FROM products WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;

      const inventory = JSON.parse(res[0].stock_quantity);

      let newQuantity = inventory + quantity;

      updateStockQuantity(productID, newQuantity);
    }
  );
};

const updateStockQuantity = (productID, newQuantity) => {
  connection.query(
    'UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE ?',
    [
      {
        item_id: productID
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log('stock quantity successfully updated!');

      connection.end();
    }
  );
};

const addProduct = (name, department, price, quantity) => {
  let sql =
    "INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES ('" +
    name +
    "', '" +
    department +
    "', '" +
    price +
    "', '" +
    quantity +
    "'   )";

  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log('product is successfully added!');

    connection.end();
  });
};

module.exports = {
  getProducts,
  getLowInventoryProducts,
  updateStock,
  addProduct
};
