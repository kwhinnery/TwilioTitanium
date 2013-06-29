var ui = require('ui/ui'),
    LoginPadView = require('ui/admin/LoginPadView'),
    DirectoryView = require('ui/admin/DirectoryView');

// Main UI module interface
module.exports = function() {
    var self = Ti.UI.createView();

    var loginView = new LoginPadView(),
        directoryView = new DirectoryView();

    self.add(loginView);
    self.add(directoryView);

    loginView.addEventListener('passwordCorrect', function() {
        directoryView.animate({
            opacity:1,
            duration:1000
        });
    });

    self.addEventListener('adminDidHide', function() {
        loginView.opacity = 1;
        directoryView.opacity = 0;
    });

    return self;
};