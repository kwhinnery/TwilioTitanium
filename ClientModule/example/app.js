// Require the Twilio native module...
var Twilio = require('com.twilio.client');

// Get a capability token...
var url = 'http://twilionode.azurewebsites.net/capability';
var client = Ti.Network.createHTTPClient({
    onload: function(e) {
        Ti.API.info('Received capability token: ' + this.responseText);
        Twilio.Device.setup(this.responseText);
    },
    onerror: function(e) {
        Ti.API.debug(e.error);
    },
    timeout: 5000
});
client.open('GET', url);
client.send();

// Make an outbound call
function makeCall() {
    Ti.API.info('making call...');
    Twilio.Device.connect({
        PhoneNumber:textField.value,
        CallerId:'+16512080532'
    });
    Ti.API.info('call enroute...');
}

// Simple UI
var win = Ti.UI.createWindow({
    backgroundColor:'white',
    layout:'vertical'
});

var textField = Ti.UI.createTextField({
    top:10,
    left:10,
    right:10,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(textField);

var button = Ti.UI.createButton({
    top:10,
    title:'Call'
});
win.add(button);
button.addEventListener('click', makeCall);

win.open();