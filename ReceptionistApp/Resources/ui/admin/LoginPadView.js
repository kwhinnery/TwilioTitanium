var ui = require('ui/ui');

// DTMF tones to play when a key is pressed
var dtmf = {
    '0':'dtmf_0.wav',
    '1':'dtmf_1.wav',
    '2':'dtmf_2.wav',
    '3':'dtmf_3.wav',
    '4':'dtmf_4.wav',
    '5':'dtmf_5.wav',
    '6':'dtmf_6.wav',
    '7':'dtmf_7.wav',
    '8':'dtmf_8.wav',
    '9':'dtmf_9.wav',
    '*':'dtmf_star.wav',
    '#':'dtmf_hash.wav',
};

// Seems like if we create a sound, it prevents delays in future sounds
Ti.Media.createSound({
    url:dtmf['5']
});

module.exports = function() {
    var self = Ti.UI.createView({
        height:500,
        width:400
    });

    var logo = Ti.UI.createImageView({
        image:'/img/twilio.png',
        top:0,
        height:93,
        width:300
    });
    self.add(logo);

    var prompt = ui.label('Please enter the admin PIN', {
        top:105,
        fontSize:22,
        fontWeight:'bold',
        textAlign:'center',
        height:25,
        width:400
    });
    self.add(prompt);

    var keypad = Ti.UI.createView({
        top:150,
        height:300,
        width:220
    });
    self.add(keypad);

    // Track the current PIN entered
    var PIN = '',
        hardCodedPassword = '*789';

    // Handle PIN pad entry
    function buttonPressed(value) {
        prompt.color = '#ffffff';
        PIN = PIN+value;

        // Update mask...
        var mask = '';
        for (var i = 0, l = PIN.length; i<l; i++) {
            mask = mask+'*';
        }
        prompt.text = mask;

        // Play sound
        Ti.Media.createSound({
            url:dtmf[value]
        }).play();

        // Check the PIN
        if (PIN.length >= hardCodedPassword.length) {
            if (PIN === hardCodedPassword) {
                PIN = '';
                prompt.text = 'w00t w00t!';
                self.animate({
                    opacity:0,
                    duration:1000
                }, function() {
                    self.fireEvent('passwordCorrect');
                    prompt.text = 'Please enter the admin PIN';
                });
            } else {
                prompt.text = 'PIN Incorrect! Please try again.';
                prompt.color = '#ff0000';
                PIN = '';
            }
        }
    }

    // create a keypad button
    function createButton(number, top, left) {
        var btn = ui.grayButton(number,{
            top:top,
            left:left,
            height:60,
            width:60
        });

        btn.addEventListener('click', function(e) {
            buttonPressed(number);
        });

        keypad.add(btn);
    }

    // Generate keypad buttons
    [
        ['1',0,0], ['2',0,80], ['3',0,160], 
        ['4',80,0], ['5',80,80], ['6',80,160],
        ['7',160,0], ['8',160,80], ['9',160,160],
        ['*',240,0], ['0',240,80], ['#',240,160]
    ].forEach(function(i) {
        createButton(i[0],i[1],i[2]);
    });

    return self;
}