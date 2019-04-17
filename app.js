// This is the entry file for this application
const customer = require('./bamazonCustomer');
const manager = require('./bamazonManager');
const supervisor = require('./bamazonSupervisor');

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
