var Twilio = require('com.twilio.client');

exports.setup = function() {
    var xhr = Ti.Network.createHTTPClient();

    // setup device with capability token
    xhr.onload = function() {
        Ti.API.info(this.responseText);
        Twilio.Device.setup(this.responseText);
    };

    // derp.
    xhr.onerror = function(e) {
        Ti.API.error('Error fetching capability token: '+e);
    };

    xhr.open('GET', 'https://twilioreceptionist.herokuapp.com/capability');
    xhr.send();
};

exports.makeCall = function(to) {
    Ti.API.info(to);
    Twilio.Device.connect({
        number:to
    });
};

exports.disconnect = function() {
    Twilio.Device.disconnectAll();
};