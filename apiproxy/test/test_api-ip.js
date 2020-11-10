var expect = require('expect.js');
var sinon = require('sinon');


const baseUrl = 'https://brunohbr123-eval-test.apigee.net/';


GLOBAL.httpClient = {
	send: function(s) {
		
	}
};

GLOBAL.Request = function(s) {};

GLOBAL.responseJsonObject = { ip: '35.224.230.242'}

var httpClientSendMethod;
var requestConstructor;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
beforeEach(function () {
	
	requestConstructor = sinon.spy(GLOBAL, 'Request');
	httpClientSendMethod = sinon.stub(httpClient, 'send');
});

// restore all stubbed methods back to their original implementation
afterEach(function() {
	requestConstructor.restore();
});

// this is the Loggly test feature here
describe('feature: get ip api', function() {
	it('should get the ip address', function() {
	
		var requestConstructorArgs = requestConstructor.args[0];
		expect(requestConstructorArgs[0]).to.equal('https://brunohbr123-eval-test.apigee.net/firstproxy');		
		expect(requestConstructorArgs[1]).to.equal('GET');		
		expect(requestConstructorArgs[2]['Content-Type']).to.equal('application/json');		
		var userPayloadObject = JSON.parse(requestConstructorArgs[3]);
		expect(userPayloadObject.ip).to.equal('35.224.230.242');		

	});


});
