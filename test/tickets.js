var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Ticket manager /ticket', function(){
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
      .post('/ticket')
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
});
