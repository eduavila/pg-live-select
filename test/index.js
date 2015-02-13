/**
 * Test Intialization
 */
if(!('CONN' in process.env))
  throw new Error(
    'CONN environment variable required! (database connection string)');
if(!('CHANNEL' in process.env))
  throw new Error(
    'CHANNEL environment variable required! (notification identifier string)');

// Global flags
global.printDebug = process.env.DEBUG !== undefined && process.env.DEBUG !== '0';
global.printStats = process.env.STATS !== undefined && process.env.STATS !== '0';

// ES6 may be used in all files required by this one
require('6to5/register');

var _          = require('lodash');
var pg         = require('pg');
var PgTriggers = require('../');

// Define global instances
pg.connect(process.env.CONN, function(error, client, done){
  if(error) throw error;
  global.client = client;
  global.clientDone = done;
  global.triggers = new PgTriggers(client, process.env.CHANNEL);
});

module.exports = _.assign(
  require('./helpers/lifecycle'),
  // Load each test module
  require('./LiveSelect')
);