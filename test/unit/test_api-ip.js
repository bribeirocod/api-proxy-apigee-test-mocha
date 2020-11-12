var expect = require('expect.js');
var sinon = require('sinon');
var request = require('request')


var baseUrl = 'https://brunohbr123-eval-test.apigee.net';
var responseDataObject, responseObject;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
describe('when stubbed', () => {
	beforeEach(() => {
	   responseObject = {
		statusCode: 200,
		headers: {
		  'content-type': 'application/json'
		}
	  };
		responseBody = {
		ip: '35.224.230.242'
	  };
	  this.get = sinon.stub(request, 'get');
	});
  
	afterEach(() => {
	  request.get.restore();
	});
	describe('GET /firstproxy', () => {
	  it('should return ip ', (done) => {
		this.get.yields(null, responseObject, JSON.stringify(responseBody));
		request.get(`${baseUrl}/firstproxy`, (err, res, body) => {
		  // there should be a 200 status code
		  expect(res.statusCode).to.equal(200);
		  // the response should be JSON
		  expect(res.headers['content-type']).to.equal('application/json')
		  // parse response body
		  body = JSON.parse(body);
		  expect(body.ip).to.equal('35.224.230.242');
		  done();
		});
	  });
	});
  });