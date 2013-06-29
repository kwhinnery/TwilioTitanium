// Module dependencies
var twilio = require('twilio'),
    express = require('express');

// Create a super basic express app
var app = express();
app.use(express.bodyParser());

// Generate a capability token for the VoIP client
app.get('/capability', function(request, response) {
    // Create a capability token generator
    // requires environment variables to be set for 
    // TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN
    var capability = new twilio.Capability();

    // Specify a TwiML app ID that contains instructions for connecting
    // an outbound call from the client app:
    capability.allowClientOutgoing('AP1d518627933fab13441b8707db9f74c4');

    // Send a plain text response with the capability token
    response.send(capability.generate());
});

// Render TwiML instructions to make an outbound call from the client side
app.post('/outbound', function(request, response) {
    // Create a TwiML response
    var twiml = new twilio.TwimlResponse();

    // Dial out to the requested number, using a Twilio number for the caller ID
    twiml.dial(request.body.number, {
        callerId:'+16513215829'
    });

    // Send an XML response
    response.set('Content-Type', 'text/xml');
    response.send(twiml.toString());
});

app.listen(process.env.PORT||3000);