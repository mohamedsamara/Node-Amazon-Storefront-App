// This is the entry file for this application
const database = require('./database.js');
const customer = require('./bamazonCustomer.js');
const manager = require('./bamazonManager.js');
const supervisor = require('./bamazonSupervisor.js');

const command = process.argv[2];

switch (command) {
  case 'customer-view':
    customer();
    break;
  case 'manager-view':
    manager();
    break;
  case 'supervisor-view':
    supervisor();
    break;
}
