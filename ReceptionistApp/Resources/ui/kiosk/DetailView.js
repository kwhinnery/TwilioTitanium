var ui = require('ui/ui'),
    TwilioService = require('services/TwilioService');

module.exports = function() {
    var hasAnimated = false,
        currentPerson = null,
        self = Ti.UI.createView({
            left:400,
            backgroundColor:'#787878',
            opacity:0
        });

    //Setup Twilio CLient
    TwilioService.setup();

    var contents = Ti.UI.createView({
        height:Ti.UI.SIZE,
        width:300,
        layout:'vertical'
    });
    self.add(contents);

    // Stand in for a directory image of some kind
    var fakeImage = Ti.UI.createImageView({
        borderRadius:10
    });
    contents.add(fakeImage);

    var header = ui.label('Name', {
        fontSize:36,
        height:Ti.UI.SIZE,
        top:10,
        width:300,
        textAlign:'center',
        fontWeight:'bold',
        fontFamily:'Marker Felt'
    });
    contents.add(header);

    var callButton = ui.blackButton('Tap to Call', {
        width:300,
        top:10
    });
    contents.add(callButton);

    callButton.addEventListener('click', function() {
        self.fireEvent('callRequested', {
            person:currentPerson,
            fakeImage:lastFakeImage
        });
    });

    // Initialize UI for Person
    var currentFakeImage = 0,
        lastFakeImage = '/img/hamm.jpg',
        fakeImages = [
            '/img/hamm.jpg',
            '/img/hendricks.jpg',
            '/img/slattery.jpg',
            '/img/moss.jpg'
        ];

    self.addEventListener('personSelected', function(e) {
        currentPerson = e.person;
        header.text = currentPerson.name;

        // cycle profile images, for effect...
        fakeImage.image = fakeImages[currentFakeImage];
        lastFakeImage = fakeImages[currentFakeImage];
        (currentFakeImage == 3) ? currentFakeImage = 0 : currentFakeImage++;

        if (!hasAnimated) {
            hasAnimated = true;
            self.animate({
                opacity:1,
                duration:1000
            });
        }
    });

    return self;
};