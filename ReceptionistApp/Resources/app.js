// Dependencies
var AdminView = require('ui/admin/AdminView'),
    KioskView = require('ui/kiosk/KioskView');

// Main app window
var app = Ti.UI.createWindow({
    backgroundImage:'/img/linen.png',
    backgroundRepeat:true
});

// Create app's main UI elements
var container = Ti.UI.createView(),
    admin = new AdminView(),
    kiosk = new KioskView();

// Create toggler
var current = 'kiosk';
var toggle = Ti.UI.createImageView({
    image:'/img/19-gear.png',
    bottom:10,
    left:10
});

toggle.addEventListener('click', function() {
    if (current == 'kiosk') {
        current = 'admin';
        toggle.image = '/img/75-phone.png';
        container.animate({
            view:admin,
            transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
    } else {
        current = 'kiosk';
        toggle.image = '/img/19-gear.png';
        container.animate({
            view:kiosk,
            transition:Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
        }, function() {
            admin.fireEvent('adminDidHide');
        });
    }
});

// Assemble main app UI
container.add(kiosk);
app.add(container);
app.add(toggle);
app.open();