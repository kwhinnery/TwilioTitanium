var ui = require('ui/ui'),
    TwilioService = require('services/TwilioService');

module.exports = function(person, fakeImage) {
    var self = Ti.UI.createWindow({
        navBarHidden:true,
        backgroundColor:'#000'
    });

    var container = Ti.UI.createView({
        top:50,
        height:Ti.UI.SIZE,
        layout:'vertical'
    });
    self.add(container);

    var fakeImage = Ti.UI.createImageView({
        image:fakeImage,
        borderRadius:10
    });
    container.add(fakeImage);

    container.add(ui.label('Now Calling...', {
        top:10,
        textAlign:'center',
        fontSize:14
    }));

    container.add(ui.label(person.name, {
        top:10,
        fontSize:48,
        fontWeight:'bold',
        fontFamily:'Marker Felt'
    }));

    var disconnect = ui.orangeButton('End Call', {
        bottom:20,
        left:20,
        right:20,
        height:100
    });
    self.add(disconnect);

    disconnect.addEventListener('click', function() {
        TwilioService.disconnect();
        self.close();
    });

    self.addEventListener('open', function() {
        Ti.API.info('open event');
        TwilioService.makeCall(person.phone);
    });

    return self;
};