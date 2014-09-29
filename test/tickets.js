var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Ticket manager /ticket', function(){
  var ticketUrl= '/ticket';
  var data = {};
  describe('POST', function(){
    it('should create a new ticket', function (done){
      var now = new Date();
      var data = {
            ticket:{
              'username': 'Javier',
              'booktime': now,
              'duration': '20', 

            }
          };

      request
        .post(ticketUrl)
        .set('Accept', 'application/json')
        .send(data)
        .expect(201) // Created
        .expect('Content-Type', /application\/json/)
        .end(function (err, res) {
          var ticket;

          var body = res.body;
          expect(body).to.have.property('ticket');
          var ticket = body.ticket;

          expect(ticket).to.have.property('username', 'Javier');
          expect(ticket).to.have.property('booktime', now.toISOString());
          expect(ticket).to.have.property('duration', '20');

          done (err);

          });
      });
    });


  describe('GET', function(){
    it ('should recieve all tickets', function(done){
      request
        .get(ticketUrl)
        .set('Accept', 'application/json')
        .send()
        .expect(200) 
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          
          var body = res.body;
          expect(body).to.have.property('ticket');

          var ticket = body.ticket;

          if (ticket.length > 1){
            var oneTicket = ticket[0];
            expect(ticket).to.have.property('username');
            expect(ticket).to.have.property('booktime');
            expect(ticket).to.have.property('duration');
          }
          done(err);

        });
    });
  });

  describe('GET', function(){
    it ('should recieve all tickets for a day', function(done){
      request
        .get('/ticket/year/month/day')
        .set('Accept', 'application/json')
        .send()
        .expect(200) 
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          
          var body = res.body;
          expect(body).to.have.property('ticket');

          var ticket = body.ticket;

          expect(ticket).to.be.an('array');
          if (ticket.length >= 1){
            var oneTicket = ticket[0];
            expect(ticket).to.have.property('username');
            expect(ticket).to.have.property('booktime');
            expect(ticket).to.have.property('duration');
          }
          done(err);

        });
    });
  });
  describe('GET', function(){
    it('should recieve a single ticket from it\'s id', function(done){
      request 
        .get((ticketUrl, '/5456efgff'))
        .set('Accept', 'application/json')
        .send()
        .expect(200) 
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {

          var body = res.body;
          expect(body).to.have.property('ticket');

          expect(ticket).to.have.property('username');
          expect(ticket).to.have.property('booktime');
          expect(ticket).to.have.property('duration');

          done(err);
        });
    });
  });
  
  describe('PUT', function(){
    it('should update a single ticket', function(done){
      request
        .put(ticketUrl)
        .set('Accept', 'application/json')
        .send()
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res){
          var ticket;

          var body = res.body;
          expect(body).to.have.property('ticket');

          expect(body.ticket).to.be.an('array')
            .and.to.have.length(1);
          ticket = body.ticket[0];

          expect(ticket).to.have.property('username');
          expect(ticket).to.have.property('booktime');
          expect(ticket).to.have.property('duration');
          
          done(err);
        });

    });
  });
});
