var ui = require('ui/ui'),
    directory = require('services/DirectoryService');

module.exports = function() {
    var hasAnimated = false,
        self = Ti.UI.createView({
            width:400,
        }),
        container = Ti.UI.createView({
            height:500,
            width:300,
            layout:'vertical'
        });

    self.add(container);

    var logo = Ti.UI.createImageView({
        image:'/img/twilio.png',
        width:300,
        top:0
    });
    container.add(logo);

    var prompt = ui.label('Welcome! Who would you like to speak with today?', {
        top:10,
        textAlign:'center',
        height:Ti.UI.SIZE,
        fontWeight:'bold',
        fontSize:14
    });
    container.add(prompt);

    var searchField = Ti.UI.createTextField({
        top:10,
        borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        height:50,
        width:300,
        hintText:'Contact or Department\'s Name'
    });
    container.add(searchField);

    var searchButton = ui.blackButton('Search', {
        top:10,
        width:300
    });
    container.add(searchButton);

    var results = Ti.UI.createTableView({
        top:10,
        backgroundColor:'transparent',
        data:[],
        separatorStyle:Ti.UI.iPhone.TableViewSeparatorStyle.NONE
    });
    container.add(results);

    results.addEventListener('click', function(e) {
        if (hasAnimated) {
            self.fireEvent('personSelected', { person:e.rowData.person });
        } else {
            self.animate({
                left:0,
                duration:1000
            }, function() {
                hasAnimated = true;
                self.fireEvent('personSelected', { person:e.rowData.person });
            });
        }
    });

    searchButton.addEventListener('click', function() {
        searchField.blur();
        var people = directory.getList(searchField.value);
        var tableData = [];
        people.forEach(function(person) {
            tableData.push({
                title:person.name,
                hasDetail:true,
                person:person
            });
        });
        results.setData(tableData);
    });

    return self;
}