var expect = require('expect.js');
var sinon = require('sinon');



GLOBAL.context = {
	getVariable: function(s) {},
	setVariable: function(s) {}
};

GLOBAL.httpClient = {
	send: function(s) {}
};

GLOBAL.Request = function(s) {};

var contextGetVariableMethod, contextSetVariableMethod;
var httpClientSendMethod;
var requestConstructor;

// This method will execute before every it() method in the test
// we are stubbing all Apigee objects and the methods we need here
beforeEach(function () {
	contextGetVariableMethod = sinon.stub(context, 'getVariable');
	contextSetVariableMethod = sinon.stub(context, 'setVariable');
	requestConstructor = sinon.spy(GLOBAL, 'Request');
	httpClientSendMethod = sinon.stub(httpClient, 'send');
});

// restore all stubbed methods back to their original implementation
afterEach(function() {
	contextGetVariableMethod.restore();
	contextSetVariableMethod.restore();
	requestConstructor.restore();
	httpClientSendMethod.restore();
});

// this is the Loggly test feature here
describe('feature: get ip firt api', function() {
	it('should get the ip address', function() {
	
		var requestConstructorArgs = requestConstructor;
		expect(requestConstructorArgs[0]).to.equal('https://brunohbr123-eval-test.apigee.net/firstproxy');		
		expect(requestConstructorArgs[1]).to.equal('GET');		
		expect(requestConstructorArgs[2]['Content-Type']).to.equal('application/json');		
		var userPayloadObject = JSON.parse(requestConstructorArgs[3]);
		expect(userPayloadObject.ip).to.equal('35.224.230.242');		

	});
});
