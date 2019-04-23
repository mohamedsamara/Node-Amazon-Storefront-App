const { connection } = require('../database');

const viewDepartmentSales = () => {
  connection.query(
    'SELECT department_id, departments.department_name, overhead_costs, SUM(product_sales) AS product_sales,  (overhead_costs - product_sales) AS total_profit FROM departments JOIN products ON departments.department_name = products.department_name GROUP BY department_name',
    function(err, res) {
      if (err) throw err;

      console.table(res);
      connection.end();
    }
  );
};

const addDepartment = (name, overhead) => {
  let sql =
    "INSERT INTO departments (department_name, overhead_costs) VALUES ('" +
    name +
    "', '" +
    overhead +
    "')";

  connection.query(sql, function(err, res) {
    if (err) throw err;
    console.log('department is successfully added!');

    connection.end();
  });
};

module.exports = {
  addDepartment,
  viewDepartmentSales
};
