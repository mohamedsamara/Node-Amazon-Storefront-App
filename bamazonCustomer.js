const readline = require('readline');

const { checkInventory } = require('./models/customer');

module.exports = function() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(
    'Looking for a product? Please enter the product ID',
    productID => {
      console.log(`Thank you`);

      rl.question('How many you want? ', quantity => {
        console.log(`Thank you, I'll check if we have it in stock`);

        checkInventory(productID, quantity);

        rl.close();
      });
    }
  );
};
