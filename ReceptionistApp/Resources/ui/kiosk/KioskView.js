var ui = require('ui/ui'),
    directory = require('services/DirectoryService'),
    SearchView = require('ui/kiosk/SearchView'),
    DetailView = require('ui/kiosk/DetailView'),
    ModalWindow = require('ui/kiosk/ModalWindow');

module.exports = function() {
    var self = Ti.UI.createView();

    var detailView = new DetailView(),
        searchView = new SearchView();

    self.add(searchView);
    self.add(detailView);

    searchView.addEventListener('personSelected', function(e) {
        detailView.fireEvent('personSelected', e);
    });

    detailView.addEventListener('callRequested', function(e) {
        var modal = new ModalWindow(e.person, e.fakeImage);
        modal.open({
            modal:true,
            modalTransitionStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_CROSS_DISSOLVE,
            modalStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
        });
    });
    
    return self;
};