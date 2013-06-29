# Twilio Titanium

This repository contains a Titanium Mobile application and supporting material 
to power an iPad-based virtual receptionist. Using a native Titanium module 
exposing [Twilio Client for iOS](http://www.twilio.com/docs/client/ios), we
can connect a voice call from an iPad to any phone in the world. Sick.

[Get Started with Titanium](http://docs.appcelerator.com/titanium/latest/#!/guide/Quick_Start)

[Get Started with Twilio](https://www.twilio.com/try-twilio)

Let's explore what's in the box for this demo:

### Client Module
This is the native iOS module which wraps the Twilio CLient SDK for iOS.  It was 
built using Titanium Mobile 3.1.1.GA.  It exposes an incomplete implementation
of the [Twilio Client JS SDK](http://www.twilio.com/docs/client/twilio-js).

### ReceptionistApp
This is a Titanium Mobile JavaScript application which actually runs on the iPad.
It was built and tested with the `titanium` node module, which is the new CLI
for Titanium applications.  Install node.js, then run:

        [sudo] npm install -g titanium

To run this app from the terminal, navigate to this directory and run:

        titanium build -p ios -F ipad -I 6.1

### ReceptionistNode
This is a node.js application which is responsible for generating our app's
[TwiML](http://www.twilio.com/docs/api/twiml) and 
[capability tokens](http://www.twilio.com/docs/client/capability-tokens). This
app assumes that your Twilio Account SID and auth token are exposed as
environment variables TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN respectively. 

If you were to run this app on [Heroku](http://www.heroku.com), you could add
these variables like so
        
        heroku config:add TWILIO_ACCOUNT_SID=put your SID here
        heroku config:add TWILIO_AUTH_TOKEN=put your auth token here

Whereever you deploy this application, change the URL in your Titanium code
in `../ReceptionistApp/Resources/services/TwilioService.js` to match.

# Demo Video
http://www.youtube.com/watch?v=fikKedhN4HM

# Module Support
At this point, this is not an official Twilio-sancitoned library - it's a hack
I put together as a proof of concept.  If you're interested in taking it further,
feel free to shoot me a mail at kwhinnery at twilio dot com.
