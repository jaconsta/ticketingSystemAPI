/**
 * Dependencies
 */
var express = require('express');
var bodyParser = require('body-parser');

/**
 * Locals
 */
var app = module.exports = express();
var port = process.env.PORT || 3000;

// parse Json request
app.use(bodyParser.json('application/json'));

/**
 * Routes
 */
app.get('/ticket', function(req, res) {
  console.log('Get request recieved for ticket');

  var ticket = {};

  // Build the response
  res.set('Content-Type', 'application/json');
  res.status(200);

  res.json({
   ticket: ticket
  });
});
app.post('/ticket', function(req,res) {
  console.log('Post request recieved for ticket');

  var newTicket = req.body.ticket;
  newTicket.id = '123';

  // Build the response
  res.set('Content-Type', 'application/json');
  res.status(201);

  res.json({
   ticket: newTicket
  });
});


/**
 * Start server if we're not someone else's dependency
 */
if (!module.parent) {
  app.listen(port, function (){
    console.log('Server Running at http://localhost:', port);
  });
}
